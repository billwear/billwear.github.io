"use strict";

function genericTouchHandler(f) {
    return function(e) {
        if (e.touches.length >= 1) {
            e.touches[0].timeStamp = e.timeStamp;
            if (f(e.touches[0])) {
                e.preventDefault();
                return false;
            }
        }
    }
}

function download_file(file_path, handler) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", file_path);
    xhr.responseType = "arraybuffer";

    xhr.onload = function(oEvent) {
        let buffer = xhr.response;
        if (buffer) {
            handler(buffer);
        }
    };
    xhr.send();
}

CanvasRenderingContext2D.prototype.roundRect = function(x, y, w, h, r) {
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    this.beginPath();
    this.moveTo(x + r, y);
    this.arcTo(x + w, y, x + w, y + h, r);
    this.arcTo(x + w, y + h, x, y + h, r);
    this.arcTo(x, y + h, x, y, r);
    this.arcTo(x, y, x + w, y, r);
    this.closePath();
    return this;
}
CanvasRenderingContext2D.prototype.fillEllipse = function(x, y, r) {
    this.beginPath();
    this.ellipse(x, y, r, r, 0, 0, Math.PI * 2);
    this.fill();
}

CanvasRenderingContext2D.prototype.strokeEllipse = function(x, y, r) {
    this.beginPath();
    this.ellipse(x, y, r, r, 0, 0, Math.PI * 2);
    this.stroke();
}

CanvasRenderingContext2D.prototype.strokeLine = function(x0, y0, x1, y1) {
    this.beginPath();
    this.lineTo(x0, y0);
    this.lineTo(x1, y1);
    this.stroke();
}

CanvasRenderingContext2D.prototype.arrow = function(x0, y0, x1, y1, w, arrw, arrh) {
    let dx = x1 - x0;
    let dy = y1 - y0;

    let l = 1.0 / Math.sqrt(dx * dx + dy * dy);
    dx *= l;
    dy *= l;

    this.beginPath();
    this.moveTo(x0 - dy * w / 2, y0 + dx * w / 2);
    this.lineTo(x1 - dy * w / 2 - dx * arrh, y1 + dx * w / 2 - dy * arrh);
    this.lineTo(x1 - dy * arrw / 2 - dx * arrh, y1 + dx * arrw / 2 - dy * arrh);
    this.lineTo(x1, y1);
    this.lineTo(x1 + dy * arrw / 2 - dx * arrh, y1 - dx * arrw / 2 - dy * arrh);
    this.lineTo(x1 + dy * w / 2 - dx * arrh, y1 - dx * w / 2 - dy * arrh);
    this.lineTo(x0 + dy * w / 2, y0 - dx * w / 2);

    this.closePath();
    return this;
}

CanvasRenderingContext2D.prototype.feather = function(w, h, l, r, t, b, tx, ty) {
    this.save();
    this.resetTransform();
    this.globalAlpha = 1;

    if (tx !== undefined && ty !== undefined)
        this.translate(tx, ty);

    this.globalCompositeOperation = "destination-out";

    let grd;
    let n = 15;
    
    let stops = new Array (n + 1);
    for (let i = 0; i <= n; i++) {
        let x = i / n;
        stops[i] = "rgba(0,0,0," + x*x*x*(x*(x*6.0-15.0)+10.0) + ")";
    }

    if (t) {
        grd = this.createLinearGradient(0, 0, 0, t);
        for (let i = 0; i <= n; i++) {
            grd.addColorStop(1 - i / n, stops[i]);
        }

        this.fillStyle = grd;
        this.fillRect(0, 0, w, t);
    }

    if (b) {
        grd = this.createLinearGradient(0, h - b, 0, h);
        for (let i = 0; i <= n; i++) {
            grd.addColorStop(i / n, stops[i]);
        }

        this.fillStyle = grd;
        this.fillRect(0, h - b, w, h);
    }

    if (l) {
        grd = this.createLinearGradient(0, 0, l, 0);
        for (let i = 0; i <= n; i++) {
            grd.addColorStop(1 - i / n, stops[i]);
        }


        this.fillStyle = grd;
        this.fillRect(0, 0, l, h);
    }

    if (r) {
        grd = this.createLinearGradient(w - r, 0, w, 0);
        for (let i = 0; i <= n; i++) {
            grd.addColorStop(i / n, stops[i]);
        }


        this.fillStyle = grd;
        this.fillRect(w - r, 0, r, h);
    }

    this.restore();
}


/* Mat 4 */

function mat4_transpose(a) {

    let res = [a[0], a[4], a[8], a[12],
        a[1], a[5], a[9], a[13],
        a[2], a[6], a[10], a[14],
        a[3], a[7], a[11], a[15]
    ];
    return res;
}


function mat4_mul(a, b) {
    /* 0  1  2  3
       4  5  6  7
       8  9 10 11
      12 13 14 15 */

    let res = new Array(16);
    res[0] = a[0] * b[0] + a[1] * b[4] + a[2] * b[8] + a[3] * b[12];
    res[1] = a[0] * b[1] + a[1] * b[5] + a[2] * b[9] + a[3] * b[13];
    res[2] = a[0] * b[2] + a[1] * b[6] + a[2] * b[10] + a[3] * b[14];
    res[3] = a[0] * b[3] + a[1] * b[7] + a[2] * b[11] + a[3] * b[15];

    res[4] = a[4] * b[0] + a[5] * b[4] + a[6] * b[8] + a[7] * b[12];
    res[5] = a[4] * b[1] + a[5] * b[5] + a[6] * b[9] + a[7] * b[13];
    res[6] = a[4] * b[2] + a[5] * b[6] + a[6] * b[10] + a[7] * b[14];
    res[7] = a[4] * b[3] + a[5] * b[7] + a[6] * b[11] + a[7] * b[15];

    res[8] = a[8] * b[0] + a[9] * b[4] + a[10] * b[8] + a[11] * b[12];
    res[9] = a[8] * b[1] + a[9] * b[5] + a[10] * b[9] + a[11] * b[13];
    res[10] = a[8] * b[2] + a[9] * b[6] + a[10] * b[10] + a[11] * b[14];
    res[11] = a[8] * b[3] + a[9] * b[7] + a[10] * b[11] + a[11] * b[15];

    res[12] = a[12] * b[0] + a[13] * b[4] + a[14] * b[8] + a[15] * b[12];
    res[13] = a[12] * b[1] + a[13] * b[5] + a[14] * b[9] + a[15] * b[13];
    res[14] = a[12] * b[2] + a[13] * b[6] + a[14] * b[10] + a[15] * b[14];
    res[15] = a[12] * b[3] + a[13] * b[7] + a[14] * b[11] + a[15] * b[15];

    return res;
}

function mat4_mul_vec3(a, b) {
    let res = new Array(4);
    res[0] = a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3];
    res[1] = a[4] * b[0] + a[5] * b[1] + a[6] * b[2] + a[7];
    res[2] = a[8] * b[0] + a[9] * b[1] + a[10] * b[2] + a[11];
    res[3] = a[12] * b[0] + a[13] * b[1] + a[14] * b[2] + a[15];

    return res;
}

function mat4_mul_vec4(a, b) {
    let res = new Array(4);
    res[0] = a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
    res[1] = a[4] * b[0] + a[5] * b[1] + a[6] * b[2] + a[7] * b[3];
    res[2] = a[8] * b[0] + a[9] * b[1] + a[10] * b[2] + a[11] * b[3];
    res[3] = a[12] * b[0] + a[13] * b[1] + a[14] * b[2] + a[15] * b[3];

    return res;
}

function mat4_invert(a) {

    let out = new Array(16);

    let a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3];
    let a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7];
    let a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11];
    let a30 = a[12],
        a31 = a[13],
        a32 = a[14],
        a33 = a[15];
    let b00 = a00 * a11 - a01 * a10;
    let b01 = a00 * a12 - a02 * a10;
    let b02 = a00 * a13 - a03 * a10;
    let b03 = a01 * a12 - a02 * a11;
    let b04 = a01 * a13 - a03 * a11;
    let b05 = a02 * a13 - a03 * a12;
    let b06 = a20 * a31 - a21 * a30;
    let b07 = a20 * a32 - a22 * a30;
    let b08 = a20 * a33 - a23 * a30;
    let b09 = a21 * a32 - a22 * a31;
    let b10 = a21 * a33 - a23 * a31;
    let b11 = a22 * a33 - a23 * a32;
    let det =
        b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
    if (!det) {
        return undefined;
    }

    det = 1.0 / det;
    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
    out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
    out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
    out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
    out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
    out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
    out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
    out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
    out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
    out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;
    return out;
}


let ident_mat4 = [1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
];


function scale_mat4(a) {
    if (a.constructor === Array) {
        return [a[0], 0, 0, 0,
            0, a[1], 0, 0,
            0, 0, a[2], 0,
            0, 0, 0, 1
        ];
    }
    return [a, 0, 0, 0,
        0, a, 0, 0,
        0, 0, a, 0,
        0, 0, 0, 1
    ];
}


function rot_x_mat4(a) {
    let c = Math.cos(a);
    let s = Math.sin(a);

    return [1, 0, 0, 0,
        0, c, -s, 0,
        0, s, c, 0,
        0, 0, 0, 1
    ];
}

function rot_y_mat4(a) {
    let c = Math.cos(a);
    let s = Math.sin(a);

    return [c, 0, s, 0,
        0, 1, 0, 0, -s, 0, c, 0,
        0, 0, 0, 1
    ];
}

function rot_z_mat4(a) {
    let c = Math.cos(a);
    let s = Math.sin(a);

    return [c, -s, 0, 0,
        s, c, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    ];
}

function translation_mat4(t) {
    return [1, 0, 0, t[0],
        0, 1, 0, t[1],
        0, 0, 1, t[2],
        0, 0, 0, 1
    ];
}

let x_flip_mat4 = [
    -1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
];

let y_flip_mat4 = [
    1, 0, 0, 0,
    0, -1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
];

let z_flip_mat4 = [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, -1, 0,
    0, 0, 0, 1
];

let x_flip_mat3 = [-1, 0, 0, 0, 1, 0, 0, 0, 1];
let y_flip_mat3 = [1, 0, 0, 0, -1, 0, 0, 0, 1];
let z_flip_mat3 = [1, 0, 0, 0, 1, 0, 0, 0, -1];


function mat3_to_mat4(mat) {
    return [mat[0], mat[1], mat[2], 0,
            mat[3], mat[4], mat[5], 0,
            mat[6], mat[7], mat[8], 0,
            0, 0, 0, 1];
}


function mat4_to_mat3(mat) {
    return [mat[0], mat[1], mat[2],
            mat[4], mat[5], mat[6],
            mat[8], mat[9], mat[10]];
}


/* Mat 3 */


function mat3_invert(a) {
    let a00 = a[0],
        a01 = a[1],
        a02 = a[2];
    let a10 = a[3],
        a11 = a[4],
        a12 = a[5];
    let a20 = a[6],
        a21 = a[7],
        a22 = a[8];
    let b01 = a22 * a11 - a12 * a21;
    let b11 = -a22 * a10 + a12 * a20;
    let b21 = a21 * a10 - a11 * a20;

    let det = a00 * b01 + a01 * b11 + a02 * b21;

    if (!det) {
        return null;
    }

    det = 1.0 / det;
    let out = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    out[0] = b01 * det;
    out[1] = (-a22 * a01 + a02 * a21) * det;
    out[2] = (a12 * a01 - a02 * a11) * det;
    out[3] = b11 * det;
    out[4] = (a22 * a00 - a02 * a20) * det;
    out[5] = (-a12 * a00 + a02 * a10) * det;
    out[6] = b21 * det;
    out[7] = (-a21 * a00 + a01 * a20) * det;
    out[8] = (a11 * a00 - a01 * a10) * det;
    return out;
}

function mat3_mul(a, b) {
    /* 0 1 2
       3 4 5
       6 7 8 */

    let res = new Array(9);
    res[0] = a[0] * b[0] + a[1] * b[3] + a[2] * b[6];
    res[1] = a[0] * b[1] + a[1] * b[4] + a[2] * b[7];
    res[2] = a[0] * b[2] + a[1] * b[5] + a[2] * b[8];

    res[3] = a[3] * b[0] + a[4] * b[3] + a[5] * b[6];
    res[4] = a[3] * b[1] + a[4] * b[4] + a[5] * b[7];
    res[5] = a[3] * b[2] + a[4] * b[5] + a[5] * b[8];

    res[6] = a[6] * b[0] + a[7] * b[3] + a[8] * b[6];
    res[7] = a[6] * b[1] + a[7] * b[4] + a[8] * b[7];
    res[8] = a[6] * b[2] + a[7] * b[5] + a[8] * b[8];

    return res;
}


function mat3_mul_vec(a, b) {
    let res = new Array(3);
    res[0] = a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
    res[1] = a[3] * b[0] + a[4] * b[1] + a[5] * b[2];
    res[2] = a[6] * b[0] + a[7] * b[1] + a[8] * b[2];

    return res;
}

function mat3_transpose(a) {

    let res = [a[0], a[3], a[6],
        a[1], a[4], a[7],
        a[2], a[5], a[8]
    ];
    return res;
}



function scale_mat3(a) {
    return [a, 0, 0, 0, a, 0, 0, 0, a];
}

function rot_x_mat3(a) {
    let c = Math.cos(a);
    let s = Math.sin(a);

    return [1, 0, 0, 0, c, -s, 0, s, c];
}

function rot_y_mat3(a) {
    let c = Math.cos(a);
    let s = Math.sin(a);

    return [c, 0, s, 0, 1, 0, -s, 0, c];
}

function rot_z_mat3(a) {
    let c = Math.cos(a);
    let s = Math.sin(a);

    return [c, -s, 0, s, c, 0, 0, 0, 1];
}

function rot_aa_mat3(axis, angle) {
    let c = Math.cos(angle);
    let s = Math.sin(angle);

    let x = axis[0];
    let y = axis[1];
    let z = axis[2];

    return [
        x * x * (1 - c) + c,
        x * y * (1 - c) - z * s,
        x * z * (1 - c) + y * s,

        y * x * (1 - c) + z * s,
        y * y * (1 - c) + c,
        y * z * (1 - c) - x * s,

        z * x * (1 - c) - y * s,
        z * y * (1 - c) + x * s,
        z * z * (1 - c) + c,
    ];
}

let ident_matrix = [1, 0, 0, 0, 1, 0, 0, 0, 1];
let ident_mat3 = ident_matrix;


function vec_add(a, b) {
    let r = new Array(a.length);
    for (let i = 0; i < a.length; i++)
        r[i] = a[i] + b[i];
    return r;
}

function vec_sub(a, b) {
    let r = new Array(a.length);
    for (let i = 0; i < a.length; i++)
        r[i] = a[i] - b[i];
    return r;
}

function vec_neg(a) {
    let r  = new Array(a.length);
    for (let i = 0; i < a.length; i++)
        r[i] = -a[i];
    return r;
}

function vec_scale(a, x) {
    let r = new Array(a.length);
    for (let i = 0; i < a.length; i++)
        r[i] = a[i] * x;
    return r;
}

function vec_mul(a, b) {
    let r = new Array(a.length);
    for (let i = 0; i < a.length; i++)
        r[i] = a[i] * b[i];
    return r;
}


function vec_dot(a, b) {
    let r = 0;
    for (let i = 0; i < a.length; i++)
        r += a[i] * b[i];
    return r;
}


function vec_cross(a, b) {
    return [a[1] * b[2] - a[2] * b[1], -a[0] * b[2] + a[2] * b[0], a[0] * b[1] - a[1] * b[0]];
}

function vec_cross_2d(a, b) {
    return a[0] * b[1] - a[1] * b[0];
}

function vec_perp_2d(x) {
    return [x[1], -x[0]];
}

function vec_len_sq(a) {
    return vec_dot(a, a);
}

function vec_len(a) {
    let d = 0;
    for (let i = 0; i < a.length; i++)
        d += a[i] * a[i];

    return Math.sqrt(d);
}

function vec_eq(a, b) {
    for (let i = 0; i < a.length; i++)
        if (a[i] != b[i])
            return false;

    return true;
}

function vec_norm(a) {
    let d = 0;
    for (let i = 0; i < a.length; i++)
        d += a[i] * a[i];

    d = 1.0 / Math.sqrt(d);
    let r = new Array(a.length);
    if (d < 1e-20) {
        for (let i = 0; i < a.length; i++)
            r[i] = 0;
        return r;
    }

    for (let i = 0; i < a.length; i++)
        r[i] = a[i] * d;
    return r;
}

function vec_lerp(a, b, f) {
    let r = new Array(a.length);
    for (let i = 0; i < a.length; i++)
        r[i] = lerp(a[i], b[i], f);
    return r;
}


function lerp(a, b, f) {
    if (f == 0)
        return a;
    else if (f == 1)
        return b;

    return a * (1 - f) + b * f;
}

function smooth_lerp(a, b, f) {
    if (f == 0)
        return a;
    else if (f == 1)
        return b;

    f = f * f * (3.0 - 2.0 * f);

    return a * (1 - f) + b * f;
}

function saturate(x) {
    return Math.max(0.0, Math.min(x, 1.0));
}

function clamp(x, a, b) {
    return Math.max(a, Math.min(x, b));
}


function step(edge0, x) {
    return x > edge0 ? 1 : 0;
}

function hash(x) {
    x = ((Math.sin(x)*0.5 + 0.5) * 43758.5453);
    return x - Math.trunc(x);
}

function sharp_step(edge0, edge1, x) {
    return saturate((x - edge0) / (edge1 - edge0));
}

function smooth_step(edge0, edge1, x) {
    x = sharp_step(edge0, edge1, x);
    return x * x * (3.0 - 2.0 * x);
}

function rgba_hex_color(rgb, a = 1) {
    return [(((rgb >> 16) & 0xff) / 255.0) * a, (((rgb >> 8) & 0xff) / 255.0) * a, ((rgb & 0xff) / 255.0) * a, a];
}

function rgba255_sq_color(r, g, b, a) {
    return [(r / 255.0) * (r / 255.0) * a, (g / 255.0) * (g / 255.0) * a, (b / 255.0) * (b / 255.0) * a, a];
}

function rgba255_color(r, g, b, a) {
    return [(r / 255.0) * a, (g / 255.0) * a, (b / 255.0) * a, a];
}

function rgba_color_string(rgba) {
    return "rgba(" + Math.round(saturate(rgba[0]) * 255) + "," +
        Math.round(saturate(rgba[1]) * 255) + "," +
        Math.round(saturate(rgba[2]) * 255) + "," +
        saturate(rgba[3]) + ")";
}

function flatten(a) {
    let r = [];
    for (let i = 0; i < a.length; i++) {
        let aa = a[i];
        if (aa.constructor !== Array) {
            r.push(aa)
            continue;
        }
        for (let k = 0; k < aa.length; k++) {
            r.push(aa[k]);
        }
    }

    return r;
}

document.addEventListener("DOMContentLoaded", function() {
    if (window.bc_touch_down_state === undefined) {
        window.bc_touch_down_state = false;
        document.addEventListener("touchstart", function(e) {
            window.bc_touch_down_state = true;
        }, false);
        document.addEventListener("touchend", function(e) {
            window.bc_touch_down_state = false;
        }, false);

        document.addEventListener("touchcancel", function(e) {
            window.bc_touch_down_state = false;
        }, false);
    }
});


window.TouchHandler = function(target, begin, move, end) {

    target.addEventListener("mousedown", mouse_down, false);

    function mouse_down(e) {
        window.addEventListener("mousemove", mouse_move, false);
        window.addEventListener("mouseup", mouse_up, false);

        let res = begin ? begin(e) : true;

        if (res && e.preventDefault)
            e.preventDefault();
        return res;
    }

    function mouse_move(e) {
        return move ? move(e) : true;
    }

    function mouse_up(e) {
        window.removeEventListener("mousemove", mouse_move, false);
        window.removeEventListener("mouseup", mouse_up, false);

        return end ? end(e) : true;
    }



    target.addEventListener("touchstart", touch_down, false);


    let identifier;

    function touch_down(e) {


        if (!identifier) {
            window.addEventListener("touchmove", touch_move, false);
            window.addEventListener("touchend", touch_end, false);
            window.addEventListener("touchcancel", touch_end, false);
            let touch = e.changedTouches[0];
            
            identifier = touch.identifier;
            touch.timeStamp = e.timeStamp;

            let res = begin ? begin(touch) : true;

            if (res && e.preventDefault)
                e.preventDefault();
            return res;
        }
        return false;



    }

    function touch_move(e) {

        if (!move)
            return true;

        for (let i = 0; i < e.changedTouches.length; i++) {
            
            let touch = e.changedTouches[i];

            if (touch.identifier == identifier) {
                touch.timeStamp = e.timeStamp;

                return move(touch);
            }
        }
    }


    function touch_end(e) {

        for (let i = 0; i < e.changedTouches.length; i++) {
            let touch = e.changedTouches[i];

            if (touch.identifier == identifier) {
                touch.timeStamp = e.timeStamp;

                identifier = undefined;

                window.removeEventListener("touchmove", touch_move, false);
                window.removeEventListener("touchend", touch_end, false);
                window.removeEventListener("touchcancel", touch_end, false);
                return end ? end(touch) : true;
            }
        }


        return true;
    }
}


window.Dragger = function(target, callback) {

    target.onmousedown = mouse_down;
    target.addEventListener("touchstart", genericTouchHandler(mouse_down), false);

    let move_handler = genericTouchHandler(mouse_move);

    let prev_mouse_x, prev_mouse_y;

    function mouse_down(e) {

        prev_mouse_x = e.clientX;
        prev_mouse_y = e.clientY;


        window.addEventListener("mousemove", mouse_move, false);
        window.addEventListener("mouseup", mouse_up, false);

        window.addEventListener("touchmove", move_handler, false);
        window.addEventListener("touchend", mouse_up, false);
        window.addEventListener("touchcancel", mouse_up, false);

        if (e.preventDefault)
            e.preventDefault();

        return true;
    }

    function mouse_move(e) {
        callback(e.clientX - prev_mouse_x, e.clientY - prev_mouse_y);

        prev_mouse_x = e.clientX;
        prev_mouse_y = e.clientY;

        return true;
    }

    function mouse_up(e) {
        window.removeEventListener("mousemove", mouse_move, false);
        window.removeEventListener("mouseup", mouse_up, false);

        window.removeEventListener("touchmove", move_handler, false);
        window.removeEventListener("touchend", mouse_up, false);
        window.removeEventListener("touchcancel", mouse_up, false);
    }
}

window.SegmentedControl = function(container_div, callback, values) {
    let container = document.createElement("div");
    container.style.position = "relative";
    container.classList.add("segmented_control_container");
    container.classList.add("non_selectable");

    container.onclick = mouse_click;

    container_div.appendChild(container);

    let segments = [];
    let option = 0;
    let pad = 2.0;

    for (let i = 0; i < values.length; i++) {
        let el = document.createElement("div");
        el.style.top = pad + "px";
        el.classList.add("segmented_control_off");
        el.innerHTML = values[i];
        container.appendChild(el);
        segments.push(el);
    }

    segments[option].classList.remove("segmented_control_off");
    segments[option].classList.add("segmented_control_on");

    window.addEventListener("resize", layout, true);
    window.addEventListener("load", layout, true);


    layout();
    callback(option);

    this.set_selection = function(o) {

        if (option != o) {

            segments[option].classList.remove("segmented_control_on");
            segments[option].classList.add("segmented_control_off");
            option = o;

            segments[option].classList.remove("segmented_control_off");
            segments[option].classList.add("segmented_control_on");

            callback(option);
        }
    }


    function layout() {
        let width = container_div.getBoundingClientRect().width;
        let w = Math.floor((width - (values.length + 1) * pad) / values.length);

        container.style.width = ((w + pad) * values.length + pad) + "px";

        for (let i = 0; i < values.length; i++) {
            let el = segments[i];
            el.style.left = (pad + (w + pad) * i) + "px";
            el.style.width = (w) + "px";
        }
    }

    function mouse_click(e) {

        let rect = container.getBoundingClientRect();
        let o = e.clientX - rect.left;
        o = Math.min(Math.max(0, Math.floor(o * values.length / rect.width)), values.length - 1);

        if (o != option) {

            segments[option].classList.remove("segmented_control_on");
            segments[option].classList.add("segmented_control_off");
            option = o;

            segments[option].classList.remove("segmented_control_off");
            segments[option].classList.add("segmented_control_on");

            callback(option);
        }

        if (e.preventDefault)
            e.preventDefault();
        return true;
    }


}

window.Slider = function(container_div, callback, style_prefix, default_value, disable_click) {
    let container = document.createElement("div");
    container.style.width = "100%";
    container.style.height = "0";
    container.style.position = "relative";
    container.classList.add("slider_container");
    if (style_prefix)
        container.classList.add(style_prefix + "slider_container");

    let left_gutter = document.createElement("div");
    left_gutter.classList.add("slider_left_gutter");
    if (style_prefix)
        left_gutter.classList.add(style_prefix + "slider_left_gutter");

    let right_gutter = document.createElement("div");
    right_gutter.classList.add("slider_right_gutter");
    if (style_prefix)
        right_gutter.classList.add(style_prefix + "slider_right_gutter");

    if (!disable_click) {
        left_gutter.onclick = mouse_click;
        right_gutter.onclick = mouse_click;
    }

    let knob_container = document.createElement("div");
    knob_container.style.width = "0";
    knob_container.style.height = "0";
    knob_container.style.top = "0"
    knob_container.style.position = "absolute";

    let knob = document.createElement("div");
    knob.classList.add("slider_knob");
    if (style_prefix)
        knob.classList.add(style_prefix + "slider_knob");



    container_div.appendChild(container);
    container.appendChild(left_gutter);
    container.appendChild(right_gutter);
    container.appendChild(knob_container);
    knob_container.appendChild(knob);

    window.addEventListener("resize", layout, true);
    window.addEventListener("load", layout, true);

    this.dragged = false;
    let self = this;

    let percentage = default_value === undefined ? 0.5 : default_value;

    layout();
    callback(percentage);

    this.set_value = function(p) {
        percentage = p;
        layout();
    }

    this.knob_div = function() {
        return knob;
    }

    function layout() {

        let l = (percentage * 100) + "%";
        let r = ((1.0 - percentage) * 100) + "%";
        left_gutter.style.width = l;
        left_gutter.style.left = "0";

        right_gutter.style.width = r;
        right_gutter.style.left = l;

        knob_container.style.left = l;
    }

    let selection_offset = 0;

    new TouchHandler(knob,
        function(e) {
            if (window.bc_touch_down_state)
                return false;

            e == e || window.event;
            let knob_rect = knob_container.getBoundingClientRect();
            selection_offset = e.clientX - knob_rect.left - knob_rect.width / 2;

            self.dragged = true;

            return true;
        },
        function(e) {
            let container_rect = container.getBoundingClientRect();
            let x = e.clientX - selection_offset - container_rect.left;

            let p = saturate(x / container_rect.width);

            if (percentage != p) {
                percentage = p;
                layout();
                callback(p);
            }

            return true;
        },
        function(e) {
            self.dragged = false;

        });


    function mouse_click(e) {
        let container_rect = container.getBoundingClientRect();
        let x = e.clientX - container_rect.left;

        let p = Math.max(0, Math.min(1.0, x / container_rect.width));

        if (percentage != p) {
            percentage = p;
            layout();
            callback(p);
        }

        return true;
    }
}


window.Shader = function(gl, vert_src, frag_src, attributes_names, uniforms_names) {

    let vert = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vert, vert_src);
    gl.compileShader(vert);


    let frag = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(frag, frag_src);
    gl.compileShader(frag);



    let shader = gl.createProgram();
    gl.attachShader(shader, vert);
    gl.attachShader(shader, frag);
    gl.linkProgram(shader);

    if (!gl.getProgramParameter(shader, gl.LINK_STATUS)) {

        const vert_message = gl.getShaderInfoLog(vert);
        if (vert_message.length > 0) {
            console.log(vert_message);
        }    

        const frag_message = gl.getShaderInfoLog(frag);
        if (frag_message.length > 0) {
            console.log(frag_message);
        }

        const info = gl.getProgramInfoLog(shader);
        console.log(info);
      }

    this.shader = shader;
    this.vert = vert;
    this.frag = frag;

    this.attributes = {};
    this.uniforms = {};

    if (attributes_names) {
        for (let i = 0; i < attributes_names.length; i++)
            this.attributes[attributes_names[i]] = gl.getAttribLocation(shader, attributes_names[i]);
    }

    if (uniforms_names) {
        for (let i = 0; i < uniforms_names.length; i++)
            this.uniforms[uniforms_names[i]] = gl.getUniformLocation(shader, uniforms_names[i]);
    }
}


function ArcBall(matrix, callback) {
    this.x_offset = 0;
    this.y_offset = 0;
    this.matrix = matrix ? matrix.slice() : [1, 0, 0, 0, 1, 0, 0, 0, 1];
    this.callback = callback;
    this.last_timestamp = 0;
    this.last_velocity = 0;
}

ArcBall.prototype.set_viewport_size = function(width, height) {
    this.width = width;
    this.height = height;
}

ArcBall.prototype.set_viewport = function(x, y, width, height) {
    this.x_offset = x;
    this.y_offset = y;
    this.width = width;
    this.height = height;
}

ArcBall.prototype.start = function(x, y) {
    this.last_x = x;
    this.last_y = y;
    this.last_velocity = 0;

    if (this.last_request) {
        window.cancelAnimationFrame(this.last_request);
        this.last_request = 0;
    }
}

ArcBall.prototype.set_matrix = function(m) {
    this.matrix = m.slice();
    this.last_velocity = 0;

    if (this.last_request) {
        window.cancelAnimationFrame(this.last_request);
        this.last_request = 0;
    }
}

ArcBall.prototype.end = function(event_timestamp) {

    if (!this.callback)
        return;

    if (event_timestamp - this.last_timestamp > 40)
        return;

    if (this.last_velocity < 0.0001)
        return;

    let last_timestamp = 0;

    let self = this;
    let mat = this.matrix;
    let a = 0;

    function tick(timestamp) {

        if (self.last_velocity < 0.0001)
            return;

        if (last_timestamp) {
            let dt = timestamp - last_timestamp;

            while (dt-- > 0) {
                a += self.last_velocity;
                self.last_velocity *= 0.995;
            }
        }

        last_timestamp = timestamp;

        let rot = rot_aa_mat3(self.last_rotation_axis, a);

        self.matrix = mat3_mul(rot, mat);

        self.callback();

        self.last_request = window.requestAnimationFrame(tick);
    };

    this.last_request = window.requestAnimationFrame(tick);
}


ArcBall.prototype.vec = function(x, y) {
    let size = Math.min(this.width, this.height) * 0.5 * 1.3;
    let p = [(x - this.x_offset - this.width / 2) / size,
        (y - this.y_offset - this.height / 2) / size, 0
    ];
    p[0] = -p[0];
    p[1] = -p[1];

    let d = p[0] * p[0] + p[1] * p[1];
    if (d <= 0.5) {
        p[2] = Math.sqrt(1 - d);
    } else {
        p[2] = 1 / (2 * Math.sqrt(d));
    }

    return p;
}

ArcBall.prototype.update = function(x, y, timestamp) {
    if (x == this.last_x && y == this.last_y)
        return;

    let va = this.vec(this.last_x, this.last_y);
    let vb = this.vec(x, y);

    let angle = Math.acos(Math.min(1.0, vec_dot(vec_norm(va), vec_norm(vb))));

    angle = Math.max(angle, vec_len(vec_sub(vb, va)));

    let axis = vec_norm(vec_cross(va, vb))
    let axis_len = vec_len_sq(axis);
    let dt = timestamp - this.last_timestamp;

    if (!isNaN(angle) && isFinite(angle) &&
        !isNaN(axis_len) && isFinite(axis_len) &&
        dt != 0) {

        this.matrix = mat3_mul(rot_aa_mat3(axis, angle), this.matrix);

        this.last_rotation_axis = vec_norm(vec_cross(va, vb));
        this.last_velocity = 0.8 * angle / dt;
    }

    this.last_timestamp = timestamp;
    this.last_x = x;
    this.last_y = y;
}


function TwoAxis() {
    this.angles = [0, 0];
    this.last_timestamp = 0;
    this.last_velocity = 0;
}

TwoAxis.prototype.set_size = function(size) {
    this.scale = [-2 / size[0], 2 / size[1]];
}

TwoAxis.prototype.set_callback = function(callback) {
    this.callback = callback;
}


TwoAxis.prototype.set_horizontal_limits = function(limits) {
    this.horizontal_limits = limits;
}

TwoAxis.prototype.set_vertical_limits = function(limits) {
    this.vertical_limits = limits;
}


TwoAxis.prototype.start = function(x, y) {
    this.last_position = [x, y];
    this.last_velocity = 0;

    if (this.last_request) {
        window.cancelAnimationFrame(this.last_request);
        this.last_request = 0;
    }
}

TwoAxis.prototype.set_angles = function(angles, continue_velocity) {

    this.angles = [angles[0] === undefined ? this.angles[0] : angles[0],
                   angles[1] === undefined ? this.angles[1] : angles[1]];
    if (this.vertical_limits)
        this.angles[1] = Math.max(this.vertical_limits[0], Math.min(this.angles[1], this.vertical_limits[1]));

    if (this.horizontal_limits)
        this.angles[0] = Math.max(this.horizontal_limits[0], Math.min(this.angles[0], this.horizontal_limits[1]));

    this.matrix = mat3_mul(rot_x_mat3(this.angles[1]), rot_z_mat3(this.angles[0]));

    if (!continue_velocity) {
        this.last_velocity = 0;

        if (this.last_request) {
            window.cancelAnimationFrame(this.last_request);
            this.last_request = 0;
        }
    }
}

TwoAxis.prototype.end = function(event_timestamp) {
    if (!this.callback)
        return;

    if (event_timestamp - this.last_timestamp > 40)
        return;

    if (vec_len_sq(this.last_velocity) < 0.00000001)
        return;

    let last_timestamp = 0;

    let self = this;

    function tick(timestamp) {

        if (vec_len_sq(self.last_velocity) < 0.00000001)
            return;

        if (last_timestamp) {
            let dt = timestamp - last_timestamp;

            while (dt-- > 0) {
                self.set_angles(vec_add(self.angles, self.last_velocity), true);
                self.last_velocity = vec_scale(self.last_velocity, 0.995);
            }
        }

        last_timestamp = timestamp;

        self.callback();

        self.last_request = window.requestAnimationFrame(tick);
    };

    this.last_request = window.requestAnimationFrame(tick);
}

TwoAxis.prototype.update = function(x, y, timestamp) {
    if (x == this.last_position[0] && y == this.last_position[1])
        return;

    let position = [x, y];

    let delta = vec_mul(vec_sub(position, this.last_position), this.scale);

    this.set_angles(vec_add(this.angles, delta));

    let dt = timestamp - this.last_timestamp;

    if (dt != 0) {
        this.last_velocity = vec_scale(delta, 1 / dt);
    }

    this.last_timestamp = timestamp;
    this.last_position = position;
}

function draw_camera_axes(ctx, l, rot) {
    ctx.save();

    ctx.lineWidth = 2;
    ctx.lineCap = "round";

    let points = [
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1]
    ];
    points = points.map(p => mat3_mul_vec(rot, p));
    points = points.map(p => vec_scale(p, l));

    points[0].push("#EC5151");
    points[1].push("#55C432");
    points[2].push("#418DE2");

    points.sort((a, b) => a[2] - b[2]);

    for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.strokeStyle = points[i][3];
        ctx.lineTo(0, 0);
        ctx.lineTo(points[i][0], -points[i][1]);
        ctx.stroke();

    }

    ctx.restore();
}
