/// <reference path="./base.js" />
"use strict";

let animated_drawers = [];
let model_drawers = [];

let gears_base2;
let gears_base2_seg;
let balance_wheel;
let models_ready = false;

let gear_train5_explainers;

(function () {

    const scale = (window.devicePixelRatio || 1) > 1.75 ? 2 : 1;

    const neutral_color = rgba255_color(240, 240, 240, 1);
    const gray_color = rgba255_color(200, 200, 200, 1);
    const bridge_color = rgba255_color(177, 177, 177, 1);
    const dark_gray_color = rgba255_color(130, 130, 130, 1);
    const digit_color = rgba255_color(55, 55, 55, 1);
    const hand_color = rgba255_color(80, 80, 80, 1);
    const white_color = rgba255_color(250, 250, 250, 1);
    const dial_color = rgba255_color(235, 235, 235, 1);

    const red_color = rgba255_color(231, 91, 85, 1);
    const orange_color = rgba255_color(228, 136, 80, 1);
    const yellow_color = rgba255_color(233, 193, 79, 1);
    const green_color = rgba255_color(136, 192, 73, 1);
    const cyan_color = rgba255_color(90, 203, 193, 1);
    const blue_color = rgba255_color(79, 162, 230, 1);
    const violet_color = rgba255_color(212, 148, 224, 1);

    let crown_turn_arrow_color = rgba255_color(216, 112, 112, 1);
    let crown_pull_arrow_color = rgba255_color(115, 141, 194, 1);

    const jewel_color = [1.0, 0.2, 0.4, 1.0];
    const neutral_jewel_color = vec_lerp(jewel_color, neutral_color, 0.8);


    const keyless_colors = {
        "Corrector_lever": yellow_color,
        "Setting_lever": green_color,
        "Setting_wheel": orange_color,
        "Yoke": cyan_color,
        "Setting_lever_jumper": violet_color,
        "Sliding_pinion": blue_color,
        "Winding_pinion": red_color,
        "Date_corrector": dark_gray_color,
    }

    const train_colors = {
        "First": red_color,
        "Second": orange_color,
        "Third": yellow_color,
        "Fourth": green_color,
        "Escape": cyan_color,
        "Balance_wheel": violet_color,
        "Pallet_fork": blue_color,
        "Barrel_arbor": yellow_color,
        "Main_spring": gray_color,
    }

    const w11_n = 101;

    const w20_n = 17;
    const w21_n = 77;

    const w30_n = 13;
    const w31_n = 90;

    const w40_n = 9;
    const w41_n = 108;

    const w50_n = 9;
    const w51_n = 20;

    const wc0_n = 78;
    const wc1_n = 16;

    const wi0_n = 36;
    const wi1_n = 12;

    const wh0_n = 64;

    const ws_n = 12;

    const wrat_n = 63;
    const wcr_n = 52;

    const wwin_n = 10;
    const wsliding_n = 11;


    const wdb0_n = 24;
    const wdb1_n = 12;

    const wdid_n = 64;

    const wdcorr_n = 19;

    const wweight_n = 38;
    const wrev_t_n = 28;
    const wrev_b_n = 39;
    const wrev_b0_n = 11;

    const wauto00_n = 9;
    const wauto01_n = 57;

    const wauto10_n = 9;
    const wauto11_n = 71;

    const wgear0_n = 10;
    const wgear1_n = 20;
    const wgear2_n = 40;
    const wgear3_n = wgear0_n * 343;

    const mode_time_set = "time_set";
    const mode_date_set = "date_set";
    const mode_crown_pull = "crown_pull";


    const base_spring_angle = 1.4;

    let models = {
        "Arrow_curve": {
            "index_offset": 0,
            "index_count": 600,
            "line_index_offset": 600,
            "line_index_count": 654,
        },
        "Arrow": {
            "index_offset": 1254,
            "index_count": 72,
            "line_index_offset": 1326,
            "line_index_count": 126,
        },
        "Automatic_device_bridge": {
            "index_offset": 1452,
            "index_count": 2712,
            "line_index_offset": 4164,
            "line_index_count": 2586,
        },
        "Automatic_device_framework": {
            "index_offset": 6750,
            "index_count": 8154,
            "line_index_offset": 14904,
            "line_index_count": 8448,
        },
        "Balance_bridge": {
            "index_offset": 23352,
            "index_count": 6942,
            "line_index_offset": 30294,
            "line_index_count": 7044,
        },
        "Balance_jewel": {
            "index_offset": 37338,
            "index_count": 732,
            "line_index_offset": 38070,
            "line_index_count": 756,
        },
        "Balance_safety": {
            "index_offset": 38826,
            "index_count": 1224,
            "line_index_offset": 40050,
            "line_index_count": 1248,
        },
        "Balance_shaft_end": {
            "index_offset": 41298,
            "index_count": 687,
            "line_index_offset": 41985,
            "line_index_count": 156,
        },
        "Balance_spring_base": {
            "index_offset": 42141,
            "index_count": 564,
            "line_index_offset": 42705,
            "line_index_count": 624,
        },
        "Balance_wheel": {
            "index_offset": 43329,
            "index_count": 3006,
            "line_index_offset": 46335,
            "line_index_count": 3018,
        },
        "Barrel_arbor": {
            "index_offset": 49353,
            "index_count": 3483,
            "line_index_offset": 52836,
            "line_index_count": 3552,
        },
        "Barrel_bridge": {
            "index_offset": 56388,
            "index_count": 8646,
            "line_index_offset": 65034,
            "line_index_count": 8952,
        },
        "Barrel_cut": {
            "index_offset": 73986,
            "index_count": 4182,
            "line_index_offset": 78168,
            "line_index_count": 5010,
        },
        "Barrel_lid": {
            "index_offset": 83178,
            "index_count": 3036,
            "line_index_offset": 86214,
            "line_index_count": 3036,
        },
        "Barrel_main": {
            "index_offset": 89250,
            "index_count": 7020,
            "line_index_offset": 96270,
            "line_index_count": 6480,
        },
        "Cannon_pinion": {
            "index_offset": 102750,
            "index_count": 1752,
            "line_index_offset": 104502,
            "line_index_count": 1440,
        },
        "Cannon_wheel": {
            "index_offset": 105942,
            "index_count": 1242,
            "line_index_offset": 107184,
            "line_index_count": 750,
        },
        "Click_spring": {
            "index_offset": 107934,
            "index_count": 1140,
            "line_index_offset": 109074,
            "line_index_count": 1182,
        },
        "Click": {
            "index_offset": 110256,
            "index_count": 672,
            "line_index_offset": 110928,
            "line_index_count": 690,
        },
        "Corrector_lever": {
            "index_offset": 111618,
            "index_count": 1356,
            "line_index_offset": 112974,
            "line_index_count": 1422,
        },
        "Crown_wheel": {
            "index_offset": 114396,
            "index_count": 1620,
            "line_index_offset": 116016,
            "line_index_count": 1080,
        },
        "Crown": {
            "index_offset": 117096,
            "index_count": 1200,
            "line_index_offset": 118296,
            "line_index_count": 1452,
        },
        "Cube": {
            "index_offset": 119748,
            "index_count": 36,
            "line_index_offset": 119784,
            "line_index_count": 72,
        },
        "Cylinder": {
            "index_offset": 119856,
            "index_count": 540,
            "line_index_offset": 120396,
            "line_index_count": 552,
        },
        "D0": {
            "index_offset": 120948,
            "index_count": 546,
            "line_index_offset": 121494,
            "line_index_count": 0,
        },
        "D1": {
            "index_offset": 121494,
            "index_count": 123,
            "line_index_offset": 121617,
            "line_index_count": 0,
        },
        "D2": {
            "index_offset": 121617,
            "index_count": 441,
            "line_index_offset": 122058,
            "line_index_count": 0,
        },
        "D3": {
            "index_offset": 122058,
            "index_count": 795,
            "line_index_offset": 122853,
            "line_index_count": 0,
        },
        "D4": {
            "index_offset": 122853,
            "index_count": 180,
            "line_index_offset": 123033,
            "line_index_count": 0,
        },
        "D5": {
            "index_offset": 123033,
            "index_count": 480,
            "line_index_offset": 123513,
            "line_index_count": 0,
        },
        "D6": {
            "index_offset": 123513,
            "index_count": 765,
            "line_index_offset": 124278,
            "line_index_count": 0,
        },
        "D7": {
            "index_offset": 124278,
            "index_count": 162,
            "line_index_offset": 124440,
            "line_index_count": 0,
        },
        "D8": {
            "index_offset": 124440,
            "index_count": 990,
            "line_index_offset": 125430,
            "line_index_count": 0,
        },
        "D9": {
            "index_offset": 125430,
            "index_count": 765,
            "line_index_offset": 126195,
            "line_index_count": 0,
        },
        "Date_corrector": {
            "index_offset": 126195,
            "index_count": 2220,
            "line_index_offset": 128415,
            "line_index_count": 2316,
        },
        "Date_indicator_spring": {
            "index_offset": 130731,
            "index_count": 1245,
            "line_index_offset": 131976,
            "line_index_count": 1776,
        },
        "Date_jumper_plate": {
            "index_offset": 133752,
            "index_count": 3594,
            "line_index_offset": 137346,
            "line_index_count": 3636,
        },
        "Date_jumper": {
            "index_offset": 140982,
            "index_count": 1590,
            "line_index_offset": 142572,
            "line_index_count": 1416,
        },
        "Date_ring": {
            "index_offset": 143988,
            "index_count": 3312,
            "line_index_offset": 147300,
            "line_index_count": 4056,
        },
        "Dial": {
            "index_offset": 151356,
            "index_count": 1524,
            "line_index_offset": 152880,
            "line_index_count": 1560,
        },
        "Escape_wheel": {
            "index_offset": 154440,
            "index_count": 4938,
            "line_index_offset": 159378,
            "line_index_count": 5598,
        },
        "Fourth_wheel": {
            "index_offset": 164976,
            "index_count": 2064,
            "line_index_offset": 167040,
            "line_index_count": 1620,
        },
        "Hour_hand": {
            "index_offset": 168660,
            "index_count": 744,
            "line_index_offset": 169404,
            "line_index_count": 792,
        },
        "Hour_wheel": {
            "index_offset": 170196,
            "index_count": 1518,
            "line_index_offset": 171714,
            "line_index_count": 1350,
        },
        "Jewel_bearing": {
            "index_offset": 173064,
            "index_count": 666,
            "line_index_offset": 173730,
            "line_index_count": 666,
        },
        "Jewel_pretty": {
            "index_offset": 174396,
            "index_count": 3654,
            "line_index_offset": 178050,
            "line_index_count": 0,
        },
        "Lower_index": {
            "index_offset": 178050,
            "index_count": 1080,
            "line_index_offset": 179130,
            "line_index_count": 1152,
        },
        "Mainplate": {
            "index_offset": 180282,
            "index_count": 28308,
            "line_index_offset": 208590,
            "line_index_count": 28956,
        },
        "Mainspring_base": {
            "index_offset": 237546,
            "index_count": 1350,
            "line_index_offset": 238896,
            "line_index_count": 1374,
        },
        "Mainspring_cut": {
            "index_offset": 240270,
            "index_count": 228,
            "line_index_offset": 240498,
            "line_index_count": 336,
        },
        "Minute_hand": {
            "index_offset": 240834,
            "index_count": 588,
            "line_index_offset": 241422,
            "line_index_count": 636,
        },
        "Minute_train_bridge": {
            "index_offset": 242058,
            "index_count": 1956,
            "line_index_offset": 244014,
            "line_index_count": 2070,
        },
        "Pallet_bridge": {
            "index_offset": 246084,
            "index_count": 4236,
            "line_index_offset": 250320,
            "line_index_count": 4290,
        },
        "Pallet_fork_horn": {
            "index_offset": 254610,
            "index_count": 1134,
            "line_index_offset": 255744,
            "line_index_count": 1170,
        },
        "Pallet_fork": {
            "index_offset": 256914,
            "index_count": 1848,
            "line_index_offset": 258762,
            "line_index_count": 1980,
        },
        "Pallet_jewel_1": {
            "index_offset": 260742,
            "index_count": 48,
            "line_index_offset": 260790,
            "line_index_count": 90,
        },
        "Pallet_jewel_2": {
            "index_offset": 260880,
            "index_count": 36,
            "line_index_offset": 260916,
            "line_index_count": 72,
        },
        "Pinion_center": {
            "index_offset": 260988,
            "index_count": 546,
            "line_index_offset": 261534,
            "line_index_count": 432,
        },
        "Ratchet_wheel": {
            "index_offset": 261966,
            "index_count": 1128,
            "line_index_offset": 263094,
            "line_index_count": 72,
        },
        "Reversing_wheel_bottom": {
            "index_offset": 263166,
            "index_count": 5838,
            "line_index_offset": 269004,
            "line_index_count": 5526,
        },
        "Reversing_wheel_cut": {
            "index_offset": 274530,
            "index_count": 4026,
            "line_index_offset": 278556,
            "line_index_count": 4614,
        },
        "Reversing_wheel_lever": {
            "index_offset": 283170,
            "index_count": 960,
            "line_index_offset": 284130,
            "line_index_count": 972,
        },
        "Reversing_wheel_top": {
            "index_offset": 285102,
            "index_count": 4302,
            "line_index_offset": 289404,
            "line_index_count": 4722,
        },
        "Screw_head": {
            "index_offset": 294126,
            "index_count": 390,
            "line_index_offset": 294516,
            "line_index_count": 426,
        },
        "Second_hand": {
            "index_offset": 294942,
            "index_count": 372,
            "line_index_offset": 295314,
            "line_index_count": 420,
        },
        "Second_wheel": {
            "index_offset": 295734,
            "index_count": 2262,
            "line_index_offset": 297996,
            "line_index_count": 1746,
        },
        "Setting_lever_jumper": {
            "index_offset": 299742,
            "index_count": 4728,
            "line_index_offset": 304470,
            "line_index_count": 4224,
        },
        "Setting_lever": {
            "index_offset": 308694,
            "index_count": 756,
            "line_index_offset": 309450,
            "line_index_count": 816,
        },
        "Shock_base_cut": {
            "index_offset": 310266,
            "index_count": 984,
            "line_index_offset": 311250,
            "line_index_count": 1878,
        },
        "Shock_base": {
            "index_offset": 313128,
            "index_count": 3918,
            "line_index_offset": 317046,
            "line_index_count": 3942,
        },
        "Shock_center_cut": {
            "index_offset": 320988,
            "index_count": 435,
            "line_index_offset": 321423,
            "line_index_count": 894,
        },
        "Shock_center": {
            "index_offset": 322317,
            "index_count": 1620,
            "line_index_offset": 323937,
            "line_index_count": 1620,
        },
        "Shock_jewel": {
            "index_offset": 325557,
            "index_count": 648,
            "line_index_offset": 326205,
            "line_index_count": 444,
        },
        "Shock_spring": {
            "index_offset": 326649,
            "index_count": 1224,
            "line_index_offset": 327873,
            "line_index_count": 1008,
        },
        "Sliding_pinion": {
            "index_offset": 328881,
            "index_count": 1854,
            "line_index_offset": 330735,
            "line_index_count": 2268,
        },
        "Stop_lever": {
            "index_offset": 333003,
            "index_count": 990,
            "line_index_offset": 333993,
            "line_index_count": 1032,
        },
        "Stud_base": {
            "index_offset": 335025,
            "index_count": 1002,
            "line_index_offset": 336027,
            "line_index_count": 1074,
        },
        "Stud": {
            "index_offset": 337101,
            "index_count": 1476,
            "line_index_offset": 338577,
            "line_index_count": 1074,
        },
        "Third_wheel": {
            "index_offset": 339651,
            "index_count": 2112,
            "line_index_offset": 341763,
            "line_index_count": 1656,
        },
        "Train_bridge": {
            "index_offset": 343419,
            "index_count": 6312,
            "line_index_offset": 349731,
            "line_index_count": 6570,
        },
        "Upper_index": {
            "index_offset": 356301,
            "index_count": 1842,
            "line_index_offset": 358143,
            "line_index_count": 1950,
        },
        "Weight": {
            "index_offset": 360093,
            "index_count": 4440,
            "line_index_offset": 364533,
            "line_index_count": 4518,
        },
        "Winding_pinion": {
            "index_offset": 369051,
            "index_count": 2268,
            "line_index_offset": 371319,
            "line_index_count": 1836,
        },
        "Winding_stem": {
            "index_offset": 373155,
            "index_count": 897,
            "line_index_offset": 374052,
            "line_index_count": 1134,
        },
        "Yoke": {
            "index_offset": 375186,
            "index_count": 1512,
            "line_index_offset": 376698,
            "line_index_count": 1602,
        },
    }


    const mainspring_n = 2048;
    const mainspring_end_n = 135;

    function tooth_points(r, n, epi_r, hypo_r, nn = 5, crown, win) {

        let angle_span = 2 * pi / n;

        let points = [];


        let m = 2 * r / n;

        let rd = r - 1.25 * m;
        let ra = r + m;

        if (crown) {
            rd -= 2 * m;
            angle_span *= 1.0;
        } else if (win) {
            rd += 0.5 * m;
        }


        let c = Math.cos(angle_span * 0.25);
        let s = Math.sin(angle_span * 0.25);


        function bisect(a, b, f) {
            let fa = f(a);

            for (let i = 0; i < 30; i++) {
                let mid = (a + b) / 2;
                let fmid = f(mid);

                if (Math.abs(fmid) < 0.000001)
                    return mid;

                if ((fmid > 0 && fa > 0) || (fmid < 0 && fa < 0)) {
                    a = mid;
                    fa = f(a);
                } else {
                    b = mid;
                }
            }

            return a;
        }

        let a_hyp = bisect(0, angle_span * 3, a => {
            let x = Math.cos(a) * (r - hypo_r) + hypo_r * Math.cos(a * (r - hypo_r) / hypo_r);
            let y = Math.sin(a) * (r - hypo_r) - hypo_r * Math.sin(a * (r - hypo_r) / hypo_r);

            let p = [x * c + y * s, -x * s + y * c];

            return vec_len_sq(p) - rd * rd;
        });

        let a_epi = bisect(0, angle_span * 2, a => {
            let x = Math.cos(a) * (r + epi_r) - epi_r * Math.cos(a * (r + epi_r) / epi_r);
            let y = Math.sin(a) * (r + epi_r) - epi_r * Math.sin(a * (r + epi_r) / epi_r);

            let p = [x * c + y * s, -x * s + y * c];

            return vec_len_sq(p) - ra * ra;
        });

        for (let i = 0; i <= nn; i++) {
            let a = -(i / nn) * a_hyp;

            let x = Math.cos(a) * (r - hypo_r) + hypo_r * Math.cos(a * (r - hypo_r) / hypo_r);
            let y = Math.sin(a) * (r - hypo_r) - hypo_r * Math.sin(a * (r - hypo_r) / hypo_r);

            let ny = -Math.sin(a) * (r - hypo_r) - hypo_r * Math.sin(a * (r - hypo_r) / hypo_r) * (r - hypo_r) / hypo_r;
            let nx = Math.cos(a) * (r - hypo_r) - hypo_r * Math.cos(a * (r - hypo_r) / hypo_r) * (r - hypo_r) / hypo_r;
            let nl = 1 / Math.sqrt(nx * nx + ny * ny);
            ny = -ny;

            if (a == 0) {
                nx = 0;
                ny = -1;
                nl = 1;
            }

            let p = [x * c + y * s, -x * s + y * c, nx * c * nl + ny * s * nl, -nx * s * nl + ny * c * nl];


            points.push(p);
        }

        let d_start = [rd * Math.cos(angle_span * (crown ? 1 : 0.5)),
        -rd * Math.sin(angle_span * (crown ? 1 : 0.5))];

        for (let i = 0; i <= nn; i++) {

            let t = (i / nn);

            let p = vec_lerp(points[points.length - 1].slice(0, 2), d_start, t);
            p = vec_norm(p);
            p = [p[0] * rd, p[1] * rd, p[0], p[1]];

            points.push(p);
        }

        points.reverse();

        for (let i = 0; i <= nn; i++) {
            let a = (i / nn) * a_epi;

            let x = Math.cos(a) * (r + epi_r) - epi_r * Math.cos(a * (r + epi_r) / epi_r);
            let y = Math.sin(a) * (r + epi_r) - epi_r * Math.sin(a * (r + epi_r) / epi_r);
            let ny = -Math.sin(a) * (r + epi_r) + epi_r * Math.sin(a * (r + epi_r) / epi_r) * (r + epi_r) / epi_r;
            let nx = Math.cos(a) * (r + epi_r) - epi_r * Math.cos(a * (r + epi_r) / epi_r) * (r + epi_r) / epi_r;

            ny = -ny;
            let nl = 1 / Math.sqrt(nx * nx + ny * ny);


            if (a == 0) {
                nx = 0;
                ny = -1;
                nl = 1;
            }

            let p = [x * c + y * s, -x * s + y * c, nx * c * nl + ny * s * nl, -nx * s * nl + ny * c * nl];

            points.push(p);
        }

        for (let i = 0; i <= nn; i++) {

            let t = (i / nn);

            let p = vec_lerp(points[points.length - 1].slice(0, 2), [ra, 0], t);
            p = vec_norm(p);
            p = [p[0] * ra, p[1] * ra, p[0], p[1]];

            points.push(p);
        }

        points = points.concat(points.map(p => [p[0], -p[1], p[2], -p[3]]).reverse());

        return points;
    }

    const pi = Math.PI;

    let all_drawers = [];
    let all_containers = [];

    function GLDrawer(scale, ready_callback) {

        let canvas = document.createElement("canvas");
        this.canvas = canvas;
        let gl = canvas.getContext('experimental-webgl', { antialias: true });

        gl.getExtension('OES_element_index_uint');

        let ext = gl.getExtension('ANGLE_instanced_arrays');

        const float_size = 4;

        let basic_vertex_buffer = gl.createBuffer();
        let basic_index_buffer = gl.createBuffer();

        let vertex_buffer = gl.createBuffer();
        let index_buffer = gl.createBuffer();

        let mainspring_vertex_buffer = gl.createBuffer();
        let mainspring_index_buffer = gl.createBuffer();


        let mainspring_end_vertex_buffer = gl.createBuffer();
        let mainspring_end_index_buffer = gl.createBuffer();

        let has_vertices = false;
        let has_indicies = false;
        let has_basic = false;



        function mark_ready() {
            if (has_vertices && has_indicies && has_basic) {
                ready_callback();
            }
        }

        download_file("/models/watch_vertices.dat", function (buffer) {
            gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(buffer), gl.STATIC_DRAW);
            gl.bindBuffer(gl.ARRAY_BUFFER, null);
            has_vertices = true;
            mark_ready();
        });

        download_file("/models/watch_indices.dat", function (buffer) {
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_buffer);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint32Array(buffer), gl.STATIC_DRAW);
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
            has_indicies = true;
            mark_ready();
        });

        let gear_teeth_models = {}

        let spring_index_offset = 0;
        let spring_index_count = 0;

        let spring_line_index_offset = 0;
        let spring_line_index_count = 0;

        let coil_spring_index_offset = 0;
        let coil_spring_index_count = 0;

        function gen_basic_geometry() {

            let vertices = [];
            let indices = [];

            gen_coil_spring();

            gen_gear_teeth("w11", 7.0313, w11_n, w20_n, 0.4, 0.07, 0.3, 0.96);
            gen_gear_teeth("w20", 7.0313, w20_n, w11_n, 0.85, 0.3, 0.07, 0);

            gen_gear_teeth("w21", 3.7928, w21_n, w30_n, 0.12, 0.07, 0.3, 0.9);
            gen_gear_teeth("w30", 3.7928, w30_n, w21_n, 0.6, 0.3, 0.07, 0);

            gen_gear_teeth("w31", 3.7203, w31_n, w40_n, 0.12, 0.07, 0.3, 0.92);
            gen_gear_teeth("w40", 3.7203, w40_n, w31_n, 0.45, 0.3, 0.07, 0);

            gen_gear_teeth("w41", 3.6707, w41_n, w50_n, 0.12, 0.03, 0.3, 0.95);
            gen_gear_teeth("w50", 3.6707, w50_n, w41_n, 0.4, 0.4, 0.03, 0);

            gen_gear_teeth("wc0", 3.6707, wc0_n, w30_n, 0.12, 0.07, 0.3, 0.82);

            gen_gear_teeth("wc1", 3.6124, wc1_n, wi0_n, 0.3, 0.3, 0.07, 0.7);
            gen_gear_teeth("wi0", 3.6124, wi0_n, wc1_n, 0.18, 0.07, 0.3, 0.82);

            gen_gear_teeth("wi1", 3.6124, wi1_n, wh0_n, 0.48, 0.3, 0.07, 0.82);
            gen_gear_teeth("wh0", 3.6124, wh0_n, wi1_n, 0.2, 0.07, 0.3, 0.82);

            gen_gear_teeth("ws0", 3.1, ws_n, wi0_n, 0.82, 0.3, 0.07, 0.82);

            gen_gear_teeth("wrat", 6.6182, wrat_n, wcr_n, 0.25, 0.04, 0.2, 0.6);
            gen_gear_teeth("wcr", 6.6182, wcr_n, wrat_n, 0.51, 0.03, 0.28, 0.92, true);

            gen_gear_teeth("wwin", 7, wwin_n, wcr_n, 0.26, 0.3, 0.07, 1, false, true);

            gen_gear_teeth("wdid", 3.4301, wdid_n, wdb1_n, 0.12, 0.07, 0.3, 0);
            gen_gear_teeth("wdb1", 3.4301, wdb1_n, wdid_n, 0.12, 0.3, 0.07, 0.5);
            gen_gear_teeth("wdb0", 4.1798, wdb0_n, wh0_n, 0.12, 0.3, 0.07, 0.5);

            gen_gear_teeth("wdcorr", 2.1, wdcorr_n, ws_n, 0.12, 0.3, 0.25, 0.0);

            gen_gear_teeth("wgear0", 3, wgear0_n, wgear1_n, 0.6, 0.2, 0.2, 0.0);
            gen_gear_teeth("wgear1", 4, wgear1_n, wgear1_n, 0.6, 0.2, 0.2, 0.0);
            gen_gear_teeth("wgear2", 6, wgear2_n, wgear1_n, 0.6, 0.2, 0.2, 0.0);
            gen_gear_teeth("wgear3", 1 + wgear3_n / wgear0_n, wgear3_n, wgear0_n, 0.6, 0.0005, 0.6, 0.0, false, false, 3);

            gen_gear_teeth("wweight", 4.5826, wweight_n, wrev_t_n, 0.4, 0.15, 0.15, 0.7);
            gen_gear_teeth("wrev_t", 4.5826, wrev_t_n, wweight_n, 0.18, 0.15, 0.15, 0.97);
            gen_gear_teeth("wrev_b", 4.2623, wrev_b_n, wrev_b_n, 0.2, 0.1, 0.1, 0.9);

            gen_gear_teeth("wrev_b0", 2.8692, wrev_b0_n, wauto01_n, 0.5, 0.3, 0.07, 0.0);
            gen_gear_teeth("wauto01", 2.8692, wauto01_n, wrev_b0_n, 0.06, 0.07, 0.7, 0.0);

            gen_gear_teeth("wauto00", 3.2186, wauto00_n, wauto11_n, 0.6, 0.3, 0.07, 0.0);
            gen_gear_teeth("wauto11", 3.2186, wauto11_n, wauto00_n, 0.12, 0.07, 0.3, 0.08);

            gen_gear_teeth("wauto10", 4.1021, wauto10_n, wrat_n, 0.5, 0.3, 0.07, 0.8);

            gen_spring();

            function gen_gear_teeth(name, d, n0, n1, w, f0, f1, extend = 1, crown, win, seg_n = 3) {

                let index_offset = indices.length;

                let r0 = d * n0 / (n0 + n1);
                let r1 = d * n1 / (n0 + n1);

                let ps = tooth_points(r0, n0, r0 * f0, r1 * f1, seg_n, crown, win);
                ps.splice(0, 0, vec_scale(ps[0], extend));
                ps.push(vec_scale(ps[ps.length - 1], extend));
                let nn = ps.length;

                if (crown)
                    n0 /= 2;

                let off = vertices.length / 6;

                ps.forEach(p => {
                    vertices.push(p[0]);
                    vertices.push(p[1]);
                    vertices.push(w / 2);
                    vertices.push(0);
                    vertices.push(0);
                    vertices.push(1);
                });

                ps.forEach(p => {
                    vertices.push(p[0]);
                    vertices.push(p[1]);
                    vertices.push(-w / 2);
                    vertices.push(0);
                    vertices.push(0);
                    vertices.push(-1);
                });

                ps.forEach(p => {
                    vertices.push(p[0]);
                    vertices.push(p[1]);
                    vertices.push(-w / 2);
                    vertices.push(p[2]);
                    vertices.push(p[3]);
                    vertices.push(0);

                    vertices.push(p[0]);
                    vertices.push(p[1]);
                    vertices.push(w / 2);
                    vertices.push(p[2]);
                    vertices.push(p[3]);
                    vertices.push(0);
                });

                for (let i = 0; i < nn / 2; i++) {
                    indices.push(off + nn - 1 - i);
                    indices.push(off + i);
                }

                indices.push(off + nn);
                indices.push(off + nn);

                for (let i = 0; i < nn / 2; i++) {
                    indices.push(off + nn + i);
                    indices.push(off + nn + nn - 1 - i);
                }

                indices.push(off + nn + nn);
                indices.push(off + nn + nn);

                for (let i = 0; i < nn; i++) {
                    indices.push(off + nn + nn + i * 2 + 1);
                    indices.push(off + nn + nn + i * 2 + 0);
                }

                let index_count = indices.length - index_offset;

                off = vertices.length / 6;

                let line_index_offset = indices.length;

                for (let z = -1; z < 2; z += 2) {
                    for (let i = 1; i < nn - 2; i++) {

                        let n = vec_norm(vec_sub([ps[i + 1][0], ps[i + 1][1], 0], [ps[i][0], ps[i][1], 0]));

                        vertices.push(ps[i][0]);
                        vertices.push(ps[i][1]);
                        vertices.push(w / 2 * z);
                        vertices.push(-n[0]);
                        vertices.push(-n[1]);
                        vertices.push(-n[2]);

                        vertices.push(ps[i][0]);
                        vertices.push(ps[i][1]);
                        vertices.push(w / 2 * z);
                        vertices.push(-2 * n[0]);
                        vertices.push(-2 * n[1]);
                        vertices.push(-2 * n[2]);

                        vertices.push(ps[i + 1][0]);
                        vertices.push(ps[i + 1][1]);
                        vertices.push(w / 2 * z);
                        vertices.push(2 * n[0]);
                        vertices.push(2 * n[1]);
                        vertices.push(2 * n[2]);

                        vertices.push(ps[i + 1][0]);
                        vertices.push(ps[i + 1][1]);
                        vertices.push(w / 2 * z);
                        vertices.push(n[0]);
                        vertices.push(n[1]);
                        vertices.push(n[2]);
                    }


                }

                seg_n++;
                let lut = [seg_n + 1, seg_n * 3 + 1, seg_n * 5 + 1, seg_n * 7 + 1];
                for (let i = 0; i < 4; i++) {
                    let t = lut[i];
                    vertices.push(ps[t][0]);
                    vertices.push(ps[t][1]);
                    vertices.push(w / 2);
                    vertices.push(0);
                    vertices.push(0);
                    vertices.push(1);

                    vertices.push(ps[t][0]);
                    vertices.push(ps[t][1]);
                    vertices.push(w / 2);
                    vertices.push(0);
                    vertices.push(0);
                    vertices.push(2);

                    vertices.push(ps[t][0]);
                    vertices.push(ps[t][1]);
                    vertices.push(-w / 2);
                    vertices.push(0);
                    vertices.push(0);
                    vertices.push(-2);

                    vertices.push(ps[t][0]);
                    vertices.push(ps[t][1]);
                    vertices.push(-w / 2);
                    vertices.push(0);
                    vertices.push(0);
                    vertices.push(-1);
                }



                for (let i = 0; i < (nn - 1) * 2; i++) {
                    indices.push(off + i * 4 + 0);
                    indices.push(off + i * 4 + 1);
                    indices.push(off + i * 4 + 2);
                    indices.push(off + i * 4 + 1);
                    indices.push(off + i * 4 + 3);
                    indices.push(off + i * 4 + 2);
                }

                let line_index_count = indices.length - line_index_offset;

                let instances = [];


                for (let i = 0; i < n0; i++) {
                    let t = 2 * pi * i / n0;
                    instances.push(Math.cos(t));
                    instances.push(Math.sin(t));
                }

                let buffer = gl.createBuffer();

                gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(instances), gl.STATIC_DRAW);
                gl.bindBuffer(gl.ARRAY_BUFFER, null);

                gear_teeth_models[name] = {
                    "index_offset": index_offset,
                    "index_count": index_count,
                    "line_index_offset": line_index_offset,
                    "line_index_count": line_index_count,
                    "instance_count": n0,
                    "instance_buffer": buffer,
                }
            }

            function gen_coil_spring() {

                coil_spring_index_offset = indices.length;

                let off = vertices.length / 6;

                let n = 20;
                let l = 256;


                for (let i = 0; i < n; i++) {
                    let a = i * Math.PI * 2 / n;
                    let x = Math.sin(a);
                    let y = Math.cos(a);

                    for (let k = 0; k < l; k++) {
                        vertices.push(x);
                        vertices.push(y);
                        vertices.push(k / (l - 1));
                        vertices.push(x);
                        vertices.push(y);
                        vertices.push(0);
                    }
                }

                for (let i = 0; i < n; i++) {
                    for (let k = 0; k < l; k++) {
                        indices.push(off + i * l + k);
                        indices.push(off + ((i + 1) % n) * l + k);
                    }

                    indices.push(off + ((i + 1) % n) * l + l - 1);
                    indices.push(off + ((i + 1) % n) * l + 0);
                }

                coil_spring_index_count = indices.length - coil_spring_index_offset;
            }


            function gen_spring() {

                let n = 1024;

                spring_index_offset = indices.length;

                for (let k = 0; k < 4; k++) {
                    let off = vertices.length / 3;

                    let lut = [-2, -1, 1, 2];
                    let j = lut[k];

                    for (let i = 0; i <= n; i++) {
                        let t = i / n;

                        vertices.push(t);
                        vertices.push(-1);
                        vertices.push(j);

                        vertices.push(t);
                        vertices.push(1);
                        vertices.push(j);
                    }

                    for (let i = 0; i < n; i++) {
                        indices.push(off + i * 2 + 0);
                        indices.push(off + i * 2 + 1);
                        indices.push(off + i * 2 + 2);
                        indices.push(off + i * 2 + 1);
                        indices.push(off + i * 2 + 3);
                        indices.push(off + i * 2 + 2);
                    }
                }

                spring_index_count = indices.length - spring_index_offset;

                spring_line_index_offset = indices.length;

                while (vertices.length % 4 != 0)
                    vertices.push(0);

                for (let k = 0; k < 4; k++) {
                    let off = vertices.length / 4;

                    let lut = [-2, -1, 1, 2];
                    let j = lut[k];

                    for (let i = 0; i < n; i++) {
                        let t = i / n;
                        let t1 = (i + 1) / n;

                        vertices.push(t);
                        vertices.push(j);
                        vertices.push(-1);
                        vertices.push(t1);

                        vertices.push(t);
                        vertices.push(j);
                        vertices.push(1);
                        vertices.push(t1);

                        vertices.push(t1);
                        vertices.push(j);
                        vertices.push(1);
                        vertices.push(t);

                        vertices.push(t1);
                        vertices.push(j);
                        vertices.push(-1);
                        vertices.push(t);
                    }

                    for (let i = 0; i < n; i++) {
                        indices.push(off + i * 4 + 0);
                        indices.push(off + i * 4 + 1);
                        indices.push(off + i * 4 + 2);
                        indices.push(off + i * 4 + 1);
                        indices.push(off + i * 4 + 3);
                        indices.push(off + i * 4 + 2);
                    }
                }

                spring_line_index_count = indices.length - spring_line_index_offset;

            }



            gl.bindBuffer(gl.ARRAY_BUFFER, basic_vertex_buffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
            gl.bindBuffer(gl.ARRAY_BUFFER, null);


            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, basic_index_buffer);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint32Array(indices), gl.STATIC_DRAW);
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);


            {
                gl.bindBuffer(gl.ARRAY_BUFFER, mainspring_vertex_buffer);
                gl.bufferData(gl.ARRAY_BUFFER, (mainspring_n + 1) * 4 * 2 * 6 * 4
                    + 4 * 6 * 4 +
                    mainspring_n * 4 * 2 * 6 * 4 * 2
                    + 4 * 6 * 4 * 4, gl.DYNAMIC_DRAW);
                gl.bindBuffer(gl.ARRAY_BUFFER, null);


                let indices = [];
                let off = 0;

                for (let k = 0; k < 4; k++) {

                    for (let i = 0; i < mainspring_n; i++) {
                        indices.push(off + i * 2 + 0);
                        indices.push(off + i * 2 + 1);
                        indices.push(off + i * 2 + 2);
                        indices.push(off + i * 2 + 1);
                        indices.push(off + i * 2 + 3);
                        indices.push(off + i * 2 + 2);
                    }

                    off += (mainspring_n + 1) * 2;
                }

                indices.push(off + 0);
                indices.push(off + 1);
                indices.push(off + 2);
                indices.push(off + 1);
                indices.push(off + 3);
                indices.push(off + 2);

                off += 4;

                for (let k = 0; k < 4; k++) {
                    for (let i = 0; i < mainspring_n; i++) {
                        indices.push(off + i * 4 + 0);
                        indices.push(off + i * 4 + 1);
                        indices.push(off + i * 4 + 2);
                        indices.push(off + i * 4 + 0);
                        indices.push(off + i * 4 + 2);
                        indices.push(off + i * 4 + 3);
                    }

                    off += (mainspring_n) * 2 * 2;
                }

                for (let k = 0; k < 4; k++) {
                    indices.push(off + k * 4 + 0);
                    indices.push(off + k * 4 + 1);
                    indices.push(off + k * 4 + 2);
                    indices.push(off + k * 4 + 0);
                    indices.push(off + k * 4 + 2);
                    indices.push(off + k * 4 + 3);
                }


                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, mainspring_index_buffer);
                gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint32Array(indices), gl.STATIC_DRAW);
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
            }

            {
                gl.bindBuffer(gl.ARRAY_BUFFER, mainspring_end_vertex_buffer);
                gl.bufferData(gl.ARRAY_BUFFER, (mainspring_end_n + 1) * 4 * 2 * 6 * 4
                    + 4 * 6 * 4 * 2 +
                    mainspring_end_n * 4 * 2 * 6 * 4 * 2
                    + 4 * 6 * 4 * 4 * 2, gl.DYNAMIC_DRAW);
                gl.bindBuffer(gl.ARRAY_BUFFER, null);


                let indices = [];
                let off = 0;

                for (let k = 0; k < 4; k++) {

                    for (let i = 0; i < mainspring_end_n; i++) {
                        indices.push(off + i * 2 + 0);
                        indices.push(off + i * 2 + 1);
                        indices.push(off + i * 2 + 2);
                        indices.push(off + i * 2 + 1);
                        indices.push(off + i * 2 + 3);
                        indices.push(off + i * 2 + 2);
                    }

                    off += (mainspring_end_n + 1) * 2;
                }

                for (let i = 0; i < 2; i++) {
                    indices.push(off + 0);
                    indices.push(off + 1);
                    indices.push(off + 2);
                    indices.push(off + 1);
                    indices.push(off + 3);
                    indices.push(off + 2);

                    off += 4;
                }

                for (let k = 0; k < 4; k++) {
                    for (let i = 0; i < mainspring_end_n; i++) {
                        indices.push(off + i * 4 + 0);
                        indices.push(off + i * 4 + 1);
                        indices.push(off + i * 4 + 2);
                        indices.push(off + i * 4 + 0);
                        indices.push(off + i * 4 + 2);
                        indices.push(off + i * 4 + 3);
                    }

                    off += (mainspring_end_n) * 2 * 2;
                }

                for (let k = 0; k < 8; k++) {
                    indices.push(off + k * 4 + 0);
                    indices.push(off + k * 4 + 1);
                    indices.push(off + k * 4 + 2);
                    indices.push(off + k * 4 + 0);
                    indices.push(off + k * 4 + 2);
                    indices.push(off + k * 4 + 3);
                }


                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, mainspring_end_index_buffer);
                gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint32Array(indices), gl.STATIC_DRAW);
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
            }

            has_basic = true;
            mark_ready();
        }

        gen_basic_geometry();

        // Shaders

        let no_op_instance_transform = `
            vec3 instance_transform(vec3 p) {
                return p;
            }
        `

        let no_op_vert_transform = `
            vec3 transform_position(vec3 p) {
                return p;
            }
        `

        let jewel_resize_vert_transform = `
        uniform vec4 params;

        vec3 transform_position(vec3 p) {
            float l = dot(p.xy, p.xy);
            
            if (l < 0.5*0.5) {
                p.xy *= params.x;
                p.z *= params.z;
            } else if (l < 0.8*0.8) {
                p.xy *= params.y;
            }
            return p;
        }
        `

        let axial_resize_vert_transform = `
        uniform vec4 params;

        vec3 transform_position(vec3 p) {
            p.x *= dot(p.xy, p.xy) > params.z ? params.w : 1.0;
            p.xy *= dot(p.xy, p.xy) < params.x ? params.y : 1.0;
            
            return p;
        }
        `

        let click_spring_vert_transform = `
        uniform vec4 params;

        vec3 transform_position(vec3 p) {

            vec2 cc = vec2(0.4, 0);

            vec2 d = p.xy - cc;
            float l = length(d);
            float a = l * params.x * (p.y > 0.0 ? -1.0 : 1.0);
            mat2 r = mat2(cos(a),-sin(a),
                          sin(a),cos(a));

            p.xy = cc + d * r;

            return p;
        }
        `

        let shock_spring_vert_transform = `
        uniform vec4 params;

        vec3 transform_position(vec3 p) {

            float pi = 3.1415926536;
            vec2 d = p.xy;
            float l = length(d);

            float a = atan(p.y, p.x) + pi;

            p.z += l * l * params.z * smoothstep(params.x, params.y, a);
            p.xy *= (1.0 - l * l * params.z * 0.3);
   
            return p;
        }
        `



        let mainspring_base_vert_transform = `
        uniform vec4 params;

        vec3 transform_position(vec3 p) {

            float pi = 3.1415926536;
            vec2 d = p.xy;
            float l = length(d);

            float a = atan(p.x, -p.y) - pi;
            a *= params.x;

            l += a * params.y;

            a += pi;

            p.x = l * sin(a);
            p.y = -l * cos(a);

            return p;
        }
        `

        let date_indicator_spring_vert_transform = `
        uniform vec4 params;

        vec3 transform_position(vec3 p) {

            float pi = 3.1415926536;
            vec2 d = p.xy;
            float l = length(d);

            float a = atan(p.x, -p.y) - pi;

            if (l > 1.1) {
                float tt = smoothstep(params.z, params.w, a);
                a += tt * params.x;
                l += tt * params.y;
            }

            a += pi;

            p.x = l * sin(a);
            p.y = -l * cos(a);

            return p;
        }
        `

        let jumper_vert_transform = `
        uniform vec4 params;

        vec3 transform_position(vec3 p) {
            vec2 c = p.xy - vec2(24.9, -45.0);
            
            if (dot(c, c) > 5.55*5.55 && p.x > 22.76)
                {
                    vec2 cc = vec2(22.1, -39.5);
                    vec2 d = p.xy - cc;
                    float l = length(d);
                    float a = smoothstep(0.0, 3.8, l) * params.x;

                    mat2 r = mat2(cos(a),-sin(a),
                                 sin(a),cos(a));

                    p.xy = cc + d * r;
                }

            if (p.x < 18.88 && p.y < -41.18)
                {
                    vec2 cc = vec2(14.9, -41.18);
                    vec2 d = p.xy - cc;
                    float l = length(d);
                    float a = l * params.y;
                    mat2 r = mat2(cos(a),-sin(a),
                                  sin(a),cos(a));

                    p.xy = cc + d * r;
                }

            return p;
        }
    `

        let date_jumper_vert_transform = `
            uniform vec4 params;

            vec3 transform_position(vec3 p) {
                
                if (dot(p.xy, p.xy) > 7.8*7.8 && p.x < 2.58)
                    {
                        vec2 cc = vec2(2.58, -7.6);
                        vec2 d = p.xy - cc;
                        float l = length(d);
                        float a = -smoothstep(0.0, 3.8, l) * params.x;

                        mat2 r = mat2(cos(a),-sin(a),
                                    sin(a),cos(a));

                        p.xy = cc + d * r;
                    }
        

                return p;
            }
        `

        let base_vert_src =
            `
            attribute vec3 v_position;
            attribute vec3 v_normal;
    
            uniform mat4 m_mvp;
            uniform mat3 m_rot;
    
            varying vec3 n_dir;

            void main(void) {
                vec3 model_pos = transform_position(instance_transform(v_position));
                n_dir = m_rot * instance_transform(v_normal);
                gl_Position = m_mvp * vec4(model_pos, 1.0);
            }
        `;

        let instance_transform = `
        attribute vec2 v_cs;

        vec3 instance_transform(vec3 p) {
            p.xy = vec2(p.x * v_cs.x + p.y * v_cs.y, -p.x * v_cs.y + p.y * v_cs.x);
            return p;
        }
        `

        let spring_vert_src = `
            attribute vec3 tuv;

            uniform mat3 params;

            uniform mat4 m_mvp;
            uniform mat3 m_rot;
            
    
            varying vec3 n_dir;

            void main(void) {

                float fi = tuv.x * params[0].x;
                float rr = params[0].y + fi * params[0].z;
                float dr = params[1].x;

                rr = mix(rr, params[2].z, smoothstep(params[2].x, params[2].y, fi));

                float s = sin(fi);
                float c = cos(fi);

                float r = rr + (abs(tuv.z) == 2.0 ? (tuv.z * dr * 0.5) : (tuv.y * dr));
                float z = abs(tuv.z) == 2.0 ? tuv.y : tuv.z;

                float tt = smoothstep(0.0, 2.7, rr);
                z += (tt * tt * 2.8 + 0.4) * params[1].y ;

                vec3 pos = vec3(s * r, c * r, z);
                vec3 normal = vec3(abs(tuv.z) == 2.0 ? (tuv.z * 0.5 * s) : 0.0,
                                   abs(tuv.z) == 2.0 ? (tuv.z * 0.5 * c) : 0.0,
                                   abs(tuv.z) == 1.0 ? tuv.z : 0.0);

                n_dir = m_rot * normalize(normal);
                gl_Position = m_mvp * vec4(pos, 1.0);
            }
        `

        let spring_line_vert_src = `
        attribute vec4 tuvw;

        uniform mat3 params;
        
        uniform mat4 m_mvp;
        uniform vec4 line_arg;

        varying float dist;

        vec3 spring_pos(float t, float u) {
            float fi = t * params[0].x;
            float rr = params[0].y + fi * params[0].z;
            float dr = params[1].x;

            rr = mix(rr, params[2].z, smoothstep(params[2].x, params[2].y, fi));

            float s = sin(fi);
            float c = cos(fi);

            float r = rr + (abs(u) == 2.0 ? (dr) : (-dr));
            float z = u < 0.0 ? 1.0 : -1.0;

            float tt = smoothstep(0.0, 2.7, rr);
            z += (tt * tt * 2.8 + 0.4) * params[1].y ;

            return vec3(s * r, c * r, z);
        }
        

        void main(void) {

            vec3 pos = spring_pos(tuvw.x, tuvw.y);
            vec3 pos2 = spring_pos(tuvw.w, tuvw.y);
            
            vec3 normal = normalize (pos - pos2);

            float perp_sign = tuvw.z;
            perp_sign *= line_arg.w;

            dist = perp_sign;

            vec4 position = m_mvp * vec4(pos + normal * line_arg.x, 1.0);
            position /= position.w;
            
            normal = (m_mvp * vec4(normal, 0.0)).xyz;
     
            vec2 ss_normal = normalize(normal.xy);

            float width = line_arg.x;
            position.x += width * line_arg.z * ss_normal.y * -perp_sign;
            position.y += width * ss_normal.x * perp_sign;
            position.z += line_arg.y;
            gl_Position = position;
        }
        `;


        let flat_frag_src =
            `
            precision mediump float;

            varying vec3 n_dir;

            uniform vec4 color;

            void main(void) {
                
                vec4 c = color;

                c.rgb *= (0.75 + 0.25 * max(0.0, n_dir.z));
                gl_FragColor = c;
            }
        `;

        let jewel_frag_src =
            `
        precision mediump float;

        varying vec3 n_dir;

        uniform vec4 color;

        void main(void) {
            float a = 0.4;
            vec4 c = color * a;

            gl_FragColor = c;
        }
    `;

        let jewel_pretty_frag_src =
            `
            precision mediump float;

            uniform highp vec4 params;

            varying vec3 n_dir;

            uniform vec4 color;

            void main(void) {

                float t = max(0.0, normalize(n_dir).z);
                float a = 0.6;
                vec4 c = color * a * t;

                float ff =  0.9 * pow(t, 10.0);
                c += vec4(ff);

                gl_FragColor = c;
            }
        `;


        let line_vert_src =
            `
        attribute vec3 v_position;
        attribute vec3 v_normal;

        uniform mat4 m_mvp;
        uniform vec4 line_arg;

        void main(void) {

            vec3 normal = instance_transform(v_normal);
            float ll = dot(normal, normal);

            float perp_sign = ll > 1.5 ? line_arg.w : -line_arg.w;
            normal *= ll > 1.5 ? 0.5 : 1.0;

            vec3 pos = transform_position(instance_transform(v_position));

            vec4 position = m_mvp * vec4(pos + normal * line_arg.x, 1.0);
            position *= (1.0 / max(0.00001, position.w));
            
            normal = (m_mvp * vec4(normal, 0.0)).xyz;
     
            vec2 ss_normal = normalize(normal.xy);

            float width = line_arg.x;
            position.x += width * line_arg.z * ss_normal.y * -perp_sign;
            position.y += width * ss_normal.x * perp_sign;
            position.z += line_arg.y;
            gl_Position = position;
        }
        `;


        let line_frag_src =
            `
            precision mediump float;

            uniform vec4 color;

            void main(void) {

                gl_FragColor = color;
            }
            `;


        let coil_spring_vert_src =
            `
        attribute vec3 v_position;
        attribute vec3 v_normal;

        uniform vec3 Rrl;
        uniform mat4 m_mvp;
        uniform mat3 m_rot;
        uniform vec2 spring_param;

        varying vec3 n_dir;

        void main(void) {
            vec3 pos = v_position;
            float t = pos.z;
            float a = t*3.1415926*spring_param.x;

            float h = spring_param.y != 0.0 ? t*t*(3.0*(1.0-t) + t) : t;
            vec3 n = v_normal;
            n.xz = n.xy;
            n.y = cos(a)*n.x;
            n.x = sin(a)*n.x;

       
            pos.xz = pos.xy * Rrl.y;
            pos.x += Rrl.x;
            pos.y = cos(a)*pos.x;
            pos.x = sin(a)*pos.x;
            pos.z += h * (Rrl.z + Rrl.y) - Rrl.y*0.5;
            if (spring_param.y != 0.0) {
                pos.z = min(Rrl.z, pos.z);
                pos.z = max(0.0, pos.z);
            }
            n_dir = m_rot * n;
            gl_Position = m_mvp * vec4(pos, 1.0);
            
        }
        `;

        let simple_shader = new Shader(gl,
            no_op_instance_transform + no_op_vert_transform + base_vert_src,
            flat_frag_src, ["v_position", "v_normal"], ["m_mvp", "m_rot", "color"]);


        let simple_instance_shader = new Shader(gl,
            instance_transform + no_op_vert_transform + base_vert_src,
            flat_frag_src, ["v_position", "v_normal", "v_cs"], ["m_mvp", "m_rot", "color"]);

        let jewel_shader = new Shader(gl,
            no_op_instance_transform + jewel_resize_vert_transform + base_vert_src,
            jewel_frag_src, ["v_position", "v_normal"], ["m_mvp", "m_rot", "color", "params"]);

        let jewel_pretty_shader = new Shader(gl,
            no_op_instance_transform + no_op_vert_transform + base_vert_src,
            jewel_pretty_frag_src, ["v_position", "v_normal"], ["m_mvp", "m_rot", "color", "params"]);



        let jumper_shader = new Shader(gl,
            no_op_instance_transform + jumper_vert_transform + base_vert_src,
            flat_frag_src, ["v_position", "v_normal"], ["m_mvp", "m_rot", "color", "params"]);

        let date_jumper_shader = new Shader(gl,
            no_op_instance_transform + date_jumper_vert_transform + base_vert_src,
            flat_frag_src, ["v_position", "v_normal"], ["m_mvp", "m_rot", "color", "params"]);

        let click_spring_shader = new Shader(gl,
            no_op_instance_transform + click_spring_vert_transform + base_vert_src,
            flat_frag_src, ["v_position", "v_normal"], ["m_mvp", "m_rot", "color", "params"]);

        let mainspring_base_shader = new Shader(gl,
            no_op_instance_transform + mainspring_base_vert_transform + base_vert_src,
            flat_frag_src, ["v_position", "v_normal"], ["m_mvp", "m_rot", "color", "params"]);

        let date_indicator_spring_shader = new Shader(gl,
            no_op_instance_transform + date_indicator_spring_vert_transform + base_vert_src,
            flat_frag_src, ["v_position", "v_normal"], ["m_mvp", "m_rot", "color", "params"]);



        let shock_spring_shader = new Shader(gl,
            no_op_instance_transform + shock_spring_vert_transform + base_vert_src,
            flat_frag_src, ["v_position", "v_normal"], ["m_mvp", "m_rot", "color", "params"]);



        let axial_resize_shader = new Shader(gl,
            no_op_instance_transform + axial_resize_vert_transform + base_vert_src,
            flat_frag_src, ["v_position", "v_normal"], ["m_mvp", "m_rot", "color", "params"]);

        let spring_shader = new Shader(gl,
            spring_vert_src,
            flat_frag_src, ["tuv"], ["m_mvp", "m_rot", "color", "params"]);

        let simple_line_shader = new Shader(gl,
            no_op_instance_transform + no_op_vert_transform + line_vert_src,
            line_frag_src, ["v_position", "v_normal"], ["m_mvp", "line_arg", "color"]);

        let simple_instance_line_shader = new Shader(gl,
            instance_transform + no_op_vert_transform + line_vert_src,
            line_frag_src, ["v_position", "v_normal", "v_cs"], ["m_mvp", "line_arg", "color"]);

        let jewel_line_shader = new Shader(gl,
            no_op_instance_transform + jewel_resize_vert_transform + line_vert_src,
            line_frag_src, ["v_position", "v_normal", "v_cs"], ["m_mvp", "params", "line_arg", "color"]);

        let jumper_line_shader = new Shader(gl,
            no_op_instance_transform + jumper_vert_transform + line_vert_src,
            line_frag_src, ["v_position", "v_normal"], ["m_mvp", "line_arg", "color", "params"]);

        let date_jumper_line_shader = new Shader(gl,
            no_op_instance_transform + date_jumper_vert_transform + line_vert_src,
            line_frag_src, ["v_position", "v_normal"], ["m_mvp", "line_arg", "color", "params"]);



        let click_spring_line_shader = new Shader(gl,
            no_op_instance_transform + click_spring_vert_transform + line_vert_src,
            line_frag_src, ["v_position", "v_normal"], ["m_mvp", "line_arg", "color", "params"]);


        let mainspring_base_line_shader = new Shader(gl,
            no_op_instance_transform + mainspring_base_vert_transform + line_vert_src,
            line_frag_src, ["v_position", "v_normal"], ["m_mvp", "line_arg", "color", "params"]);

        let date_indicator_spring_line_shader = new Shader(gl,
            no_op_instance_transform + date_indicator_spring_vert_transform + line_vert_src,
            line_frag_src, ["v_position", "v_normal"], ["m_mvp", "line_arg", "color", "params"]);


        let shock_spring_line_shader = new Shader(gl,
            no_op_instance_transform + shock_spring_vert_transform + line_vert_src,
            line_frag_src, ["v_position", "v_normal"], ["m_mvp", "line_arg", "color", "params"]);


        let axial_resize_line_shader = new Shader(gl,
            no_op_instance_transform + axial_resize_vert_transform + line_vert_src,
            line_frag_src, ["v_position", "v_normal"], ["m_mvp", "line_arg", "color", "params"]);

        let spring_line_shader = new Shader(gl,
            spring_line_vert_src,
            line_frag_src, ["tuv", "tn"], ["m_mvp", "line_arg", "color", "params"]);

        let coil_spring_shader = new Shader(gl,
            coil_spring_vert_src,
            flat_frag_src,
            ["v_position", "v_normal"],
            ["m_mvp", "m_rot", "color", "Rrl", "spring_param"]);


        let prev_width, prev_height;

        let viewport_w = 0;
        let viewport_h = 0;

        let line_offset;

        this.set_line_offset = function (x) { line_offset = x; }

        this.begin = function (width, height) {

            line_offset = -0.0007;
            width *= scale;
            height *= scale;

            if (width != prev_width || height != prev_height) {
                canvas.width = width;
                canvas.height = height;
                prev_width = width;
                prev_height = height;
            }

            gl.viewport(0, 0, width, height);

            gl.disable(gl.BLEND);
            gl.depthMask(true);
            gl.depthFunc(gl.LEQUAL);
            gl.clearColor(0.0, 0.0, 0.0, 0.0);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

            gl.disable(gl.CULL_FACE);

            gl.enable(gl.DEPTH_TEST);
            gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

            viewport_w = Math.round(width);
            viewport_h = Math.round(height);
        }

        this.viewport = function (x, y, w, h) {
            gl.viewport(x * scale, y * scale, w * scale, h * scale);
        }


        this.finish = function () {
            gl.flush();
            return gl.canvas;
        }

        this.update_mainspring_buffer = function (values, dr, end) {

            let n = end ? mainspring_end_n : mainspring_n;
            function vec_perp(x) { return [x[1], -x[0]]; }

            let cap_n = end ? 2 : 1;

            let vertices = new Float32Array((n + 1) * 6 * 2 * 4
                + 6 * 4 * cap_n +
                n * 4 * 24 +
                6 * 4 * 4 * cap_n);
            let normals = new Array(n + 1);
            let vi = 0;

            normals[0] = vec_perp(vec_norm(vec_sub(values[1], values[0])));

            for (let i = 1; i < n; i++) {
                normals[i] = vec_perp(vec_norm(vec_sub(values[i + 1], values[i - 1])));
            }

            normals[n] = vec_perp(vec_norm(vec_sub(values[n], values[n - 1])));


            for (let sign = -1; sign < 2; sign += 2) {

                for (let i = 0; i <= n; i++) {

                    vertices[vi++] = (values[i][0] + sign * normals[i][0] * dr);
                    vertices[vi++] = (values[i][1] + sign * normals[i][1] * dr);
                    vertices[vi++] = (-sign);

                    vertices[vi++] = (sign * normals[i][0]);
                    vertices[vi++] = (sign * normals[i][1]);
                    vertices[vi++] = (0);

                    vertices[vi++] = (values[i][0] + sign * normals[i][0] * dr);
                    vertices[vi++] = (values[i][1] + sign * normals[i][1] * dr);
                    vertices[vi++] = (sign);

                    vertices[vi++] = (sign * normals[i][0]);
                    vertices[vi++] = (sign * normals[i][1]);
                    vertices[vi++] = (0);
                }
            }

            for (let sign = -1; sign < 2; sign += 2) {

                for (let i = 0; i <= n; i++) {

                    vertices[vi++] = (values[i][0] + normals[i][0] * dr);
                    vertices[vi++] = (values[i][1] + normals[i][1] * dr);
                    vertices[vi++] = (sign);

                    vertices[vi++] = (0);
                    vertices[vi++] = (0);
                    vertices[vi++] = (sign);

                    vertices[vi++] = (values[i][0] - normals[i][0] * dr);
                    vertices[vi++] = (values[i][1] - normals[i][1] * dr);
                    vertices[vi++] = (sign);

                    vertices[vi++] = (0);
                    vertices[vi++] = (0);
                    vertices[vi++] = (sign);
                }
            }


            for (let i = 0; i < cap_n; i++) {

                let k = i == 0 ? n : 0;
                vertices[vi++] = (values[k][0] + normals[k][0] * dr);
                vertices[vi++] = (values[k][1] + normals[k][1] * dr);
                vertices[vi++] = (1);

                vertices[vi++] = (-normals[k][1]);
                vertices[vi++] = (normals[k][0]);
                vertices[vi++] = (0);

                vertices[vi++] = (values[k][0] - normals[k][0] * dr);
                vertices[vi++] = (values[k][1] - normals[k][1] * dr);
                vertices[vi++] = (1);

                vertices[vi++] = (-normals[k][1]);
                vertices[vi++] = (normals[k][0]);
                vertices[vi++] = (0);


                vertices[vi++] = (values[k][0] + normals[k][0] * dr);
                vertices[vi++] = (values[k][1] + normals[k][1] * dr);
                vertices[vi++] = (-1);

                vertices[vi++] = (-normals[k][1]);
                vertices[vi++] = (normals[k][0]);
                vertices[vi++] = (0);

                vertices[vi++] = (values[k][0] - normals[k][0] * dr);
                vertices[vi++] = (values[k][1] - normals[k][1] * dr);
                vertices[vi++] = (-1);

                vertices[vi++] = (-normals[k][1]);
                vertices[vi++] = (normals[k][0]);
                vertices[vi++] = (0);
            }



            // lines

            for (let sign0 = -1; sign0 < 2; sign0 += 2) {

                for (let sign1 = -1; sign1 < 2; sign1 += 2) {

                    for (let i = 0; i < n; i++) {

                        let v0 = vec_add(values[i], vec_scale(normals[i], sign0 * dr));
                        let v1 = vec_add(values[i + 1], vec_scale(normals[i + 1], sign0 * dr));

                        let n = vec_norm(vec_sub(v1, v0));

                        vertices[vi++] = (v0[0]);
                        vertices[vi++] = (v0[1]);
                        vertices[vi++] = (sign1);

                        vertices[vi++] = (-n[0]);
                        vertices[vi++] = (-n[1]);
                        vertices[vi++] = (0);

                        vertices[vi++] = (v0[0]);
                        vertices[vi++] = (v0[1]);
                        vertices[vi++] = (sign1);

                        vertices[vi++] = (-2 * n[0]);
                        vertices[vi++] = (-2 * n[1]);
                        vertices[vi++] = (0);


                        vertices[vi++] = (v1[0]);
                        vertices[vi++] = (v1[1]);
                        vertices[vi++] = (sign1);

                        vertices[vi++] = (n[0]);
                        vertices[vi++] = (n[1]);
                        vertices[vi++] = (0);

                        vertices[vi++] = (v1[0]);
                        vertices[vi++] = (v1[1]);
                        vertices[vi++] = (sign1);

                        vertices[vi++] = (2 * n[0]);
                        vertices[vi++] = (2 * n[1]);
                        vertices[vi++] = (0);
                    }
                }
            }

            for (let j = 0; j < cap_n; j++) {

                let k = j == 0 ? n : 0;


                let pp = [
                    [values[k][0] + normals[k][0] * dr,
                    values[k][1] + normals[k][1] * dr, 1],

                    [values[k][0] - normals[k][0] * dr,
                    values[k][1] - normals[k][1] * dr, 1],

                    [values[k][0] - normals[k][0] * dr,
                    values[k][1] - normals[k][1] * dr, -1],

                    [values[k][0] + normals[k][0] * dr,
                    values[k][1] + normals[k][1] * dr, -1],
                ]

                for (let i = 0; i < 4; i++) {

                    let v0 = pp[i];
                    let v1 = pp[(i + 1) & 3];

                    let n = vec_norm(vec_sub(v1, v0));

                    vertices[vi++] = (v0[0]);
                    vertices[vi++] = (v0[1]);
                    vertices[vi++] = (v0[2]);

                    vertices[vi++] = (-n[0]);
                    vertices[vi++] = (-n[1]);
                    vertices[vi++] = (-n[2]);

                    vertices[vi++] = (v0[0]);
                    vertices[vi++] = (v0[1]);
                    vertices[vi++] = (v0[2]);

                    vertices[vi++] = (-2 * n[0]);
                    vertices[vi++] = (-2 * n[1]);
                    vertices[vi++] = (-2 * n[2]);


                    vertices[vi++] = (v1[0]);
                    vertices[vi++] = (v1[1]);
                    vertices[vi++] = (v1[2]);

                    vertices[vi++] = (n[0]);
                    vertices[vi++] = (n[1]);
                    vertices[vi++] = (n[2]);

                    vertices[vi++] = (v1[0]);
                    vertices[vi++] = (v1[1]);
                    vertices[vi++] = (v1[2]);

                    vertices[vi++] = (2 * n[0]);
                    vertices[vi++] = (2 * n[1]);
                    vertices[vi++] = (2 * n[2]);
                }
            }

            gl.bindBuffer(gl.ARRAY_BUFFER, end ? mainspring_end_vertex_buffer : mainspring_vertex_buffer);
            gl.bufferSubData(gl.ARRAY_BUFFER, 0, vertices);
            gl.bindBuffer(gl.ARRAY_BUFFER, null);
        }

        this.draw_gear_teeth_mesh = function (name, mvp, rotation, color, opacity, shader_type, params) {

            if (color === undefined)
                color = neutral_color;

            let mesh = gear_teeth_models[name];

            let line_arg = [2 / viewport_h, line_offset, viewport_w / viewport_h, 1];

            let line_dim = 0.5;
            let line_color = color.slice();

            line_color[0] *= line_dim;
            line_color[1] *= line_dim;
            line_color[2] *= line_dim;

            let shader = simple_instance_shader;
            let line_shader = simple_instance_line_shader;

            gl.enable(gl.CULL_FACE);
            // gl.cullFace(backface ? gl.FRONT : gl.BACK);

            gl.useProgram(line_shader.shader);

            gl.bindBuffer(gl.ARRAY_BUFFER, mesh.instance_buffer);

            gl.enableVertexAttribArray(line_shader.attributes["v_cs"]);
            gl.vertexAttribPointer(line_shader.attributes["v_cs"], 2, gl.FLOAT, false, 2 * float_size, 0);
            ext.vertexAttribDivisorANGLE(line_shader.attributes["v_cs"], 1);

            gl.bindBuffer(gl.ARRAY_BUFFER, basic_vertex_buffer);
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, basic_index_buffer);

            gl.enableVertexAttribArray(line_shader.attributes["v_position"]);
            gl.vertexAttribPointer(line_shader.attributes["v_position"], 3, gl.FLOAT, false, 24, 0);
            gl.enableVertexAttribArray(line_shader.attributes["v_normal"]);
            gl.vertexAttribPointer(line_shader.attributes["v_normal"], 3, gl.FLOAT, false, 24, 12);


            gl.uniformMatrix4fv(line_shader.uniforms["m_mvp"], false, mat4_transpose(mvp));
            gl.uniform4fv(line_shader.uniforms["line_arg"], line_arg);
            gl.uniform4fv(line_shader.uniforms["color"], line_color);


            ext.drawElementsInstancedANGLE(gl.TRIANGLES, mesh.line_index_count, gl.UNSIGNED_INT, mesh.line_index_offset * 4,
                mesh.instance_count);

            ext.vertexAttribDivisorANGLE(line_shader.attributes["v_cs"], 0);

            gl.useProgram(shader.shader);

            gl.bindBuffer(gl.ARRAY_BUFFER, mesh.instance_buffer);

            gl.enableVertexAttribArray(shader.attributes["v_cs"]);
            gl.vertexAttribPointer(shader.attributes["v_cs"], 2, gl.FLOAT, false, 2 * float_size, 0);
            ext.vertexAttribDivisorANGLE(shader.attributes["v_cs"], 1);

            gl.bindBuffer(gl.ARRAY_BUFFER, basic_vertex_buffer);
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, basic_index_buffer);

            gl.enableVertexAttribArray(shader.attributes["v_position"]);
            gl.vertexAttribPointer(shader.attributes["v_position"], 3, gl.FLOAT, false, 24, 0);
            gl.enableVertexAttribArray(shader.attributes["v_normal"]);
            gl.vertexAttribPointer(shader.attributes["v_normal"], 3, gl.FLOAT, false, 24, 12);


            gl.uniformMatrix4fv(shader.uniforms["m_mvp"], false, mat4_transpose(mvp));
            gl.uniformMatrix3fv(shader.uniforms["m_rot"], false, mat3_invert(rotation));

            gl.uniform4fv(shader.uniforms["color"], color);

            if (params)
                gl.uniform4fv(shader.uniforms["params"], params);


            ext.drawElementsInstancedANGLE(gl.TRIANGLE_STRIP, mesh.index_count, gl.UNSIGNED_INT, mesh.index_offset * 4,
                mesh.instance_count);

            ext.vertexAttribDivisorANGLE(shader.attributes["v_cs"], 0);
        }

        this.draw_mainspring = function (mvp, rotation, color, end) {


            if (color === undefined)
                color = neutral_color;


            let line_arg = [2 / viewport_h, line_offset, viewport_w / viewport_h, 1];


            let line_dim = 0.5;
            let line_color = color.slice();

            line_color[0] *= line_dim;
            line_color[1] *= line_dim;
            line_color[2] *= line_dim;

            let shader = simple_shader;
            let line_shader = simple_line_shader;

            //
            gl.useProgram(line_shader.shader);

            if (end) {
                gl.bindBuffer(gl.ARRAY_BUFFER, mainspring_end_vertex_buffer);
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, mainspring_end_index_buffer);

            } else {
                gl.bindBuffer(gl.ARRAY_BUFFER, mainspring_vertex_buffer);
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, mainspring_index_buffer);
            }

            gl.enableVertexAttribArray(line_shader.attributes["v_position"]);
            gl.vertexAttribPointer(line_shader.attributes["v_position"], 3, gl.FLOAT, false, 24, 0);
            gl.enableVertexAttribArray(line_shader.attributes["v_normal"]);
            gl.vertexAttribPointer(line_shader.attributes["v_normal"], 3, gl.FLOAT, false, 24, 12);


            gl.uniformMatrix4fv(line_shader.uniforms["m_mvp"], false, mat4_transpose(mvp));
            gl.uniform4fv(line_shader.uniforms["line_arg"], line_arg);
            gl.uniform4fv(line_shader.uniforms["color"], line_color);



            let n = end ? mainspring_end_n : mainspring_n;
            let cap = end ? 2 : 1;

            gl.drawElements(gl.TRIANGLES, (n) * 4 * 2 * 3 + 4 * 3 * 2 * cap, gl.UNSIGNED_INT, (n) * 4 * 2 * 3 * 4 + 6 * 4 * cap);

            gl.useProgram(shader.shader);
            gl.disable(gl.CULL_FACE);



            gl.enableVertexAttribArray(shader.attributes["v_position"]);
            gl.vertexAttribPointer(shader.attributes["v_position"], 3, gl.FLOAT, false, 24, 0);
            gl.enableVertexAttribArray(shader.attributes["v_normal"]);
            gl.vertexAttribPointer(shader.attributes["v_normal"], 3, gl.FLOAT, false, 24, 12);


            gl.uniformMatrix4fv(shader.uniforms["m_mvp"], false, mat4_transpose(mvp));
            gl.uniformMatrix3fv(shader.uniforms["m_rot"], false, mat3_invert(rotation));

            gl.uniform4fv(shader.uniforms["color"], color);

            gl.drawElements(gl.TRIANGLES, (n) * 4 * 2 * 3 + 6 * cap, gl.UNSIGNED_INT, 0);
        }

        this.draw_mesh = function (name, mvp, rotation, color, opacity, shader_type, params) {


            if (color === undefined)
                color = neutral_color;

            let mesh = models[name];

            let line_arg = [2 / viewport_h, line_offset, viewport_w / viewport_h, 1];


            let line_dim = 0.5;
            let line_color = color.slice();

            line_color[0] *= line_dim;
            line_color[1] *= line_dim;
            line_color[2] *= line_dim;

            let shader = simple_shader;
            let line_shader = simple_line_shader;

            if (shader_type === "jumper") {
                shader = jumper_shader;
                line_shader = jumper_line_shader;
            } else if (shader_type === "click_spring") {
                shader = click_spring_shader;
                line_shader = click_spring_line_shader;
            } else if (shader_type === "mainspring_base") {
                shader = mainspring_base_shader;
                line_shader = mainspring_base_line_shader;
            } else if (shader_type === "date_indicator_spring") {
                shader = date_indicator_spring_shader;
                line_shader = date_indicator_spring_line_shader;
            } else if (shader_type === "shock_spring") {
                shader = shock_spring_shader;
                line_shader = shock_spring_line_shader;
            } else if (shader_type === "date_jumper") {
                shader = date_jumper_shader;
                line_shader = date_jumper_line_shader;

            } else if (shader_type === "jewel") {
                shader = jewel_shader;
                line_shader = jewel_line_shader;

                line_color[0] = color[0] * 0.6;
                line_color[1] = color[2] * 0.6;
                line_color[2] = color[1] * 0.6;
            } else if (shader_type === "jewel_pretty") {
                shader = jewel_pretty_shader;
                line_shader = jewel_line_shader;

            } else if (shader_type === "axial_resize") {
                shader = axial_resize_shader;
                line_shader = axial_resize_line_shader;


            }

            if (shader_type !== "no_lines" && mesh.line_index_count > 0) {

                gl.enable(gl.CULL_FACE);

                gl.useProgram(line_shader.shader);

                gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_buffer);

                gl.enableVertexAttribArray(line_shader.attributes["v_position"]);
                gl.vertexAttribPointer(line_shader.attributes["v_position"], 3, gl.FLOAT, false, 24, 0);
                gl.enableVertexAttribArray(line_shader.attributes["v_normal"]);
                gl.vertexAttribPointer(line_shader.attributes["v_normal"], 3, gl.FLOAT, false, 24, 12);


                gl.uniformMatrix4fv(line_shader.uniforms["m_mvp"], false, mat4_transpose(mvp));
                gl.uniform4fv(line_shader.uniforms["line_arg"], line_arg);
                gl.uniform4fv(line_shader.uniforms["color"], line_color);

                if (params)
                    gl.uniform4fv(line_shader.uniforms["params"], params);

                gl.drawElements(gl.TRIANGLES, mesh.line_index_count, gl.UNSIGNED_INT, mesh.line_index_offset * 4);
            }


            if (shader_type === "jewel") {
                shader = jewel_shader;

                gl.enable(gl.BLEND);
                gl.depthMask(false);
            }


            gl.useProgram(shader.shader);

            gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_buffer);

            gl.enableVertexAttribArray(shader.attributes["v_position"]);
            gl.vertexAttribPointer(shader.attributes["v_position"], 3, gl.FLOAT, false, 24, 0);
            gl.enableVertexAttribArray(shader.attributes["v_normal"]);
            gl.vertexAttribPointer(shader.attributes["v_normal"], 3, gl.FLOAT, false, 24, 12);


            gl.uniformMatrix4fv(shader.uniforms["m_mvp"], false, mat4_transpose(mvp));
            gl.uniformMatrix3fv(shader.uniforms["m_rot"], false, mat3_invert(rotation));

            gl.uniform4fv(shader.uniforms["color"], color);

            if (params)
                gl.uniform4fv(shader.uniforms["params"], params);

            gl.drawElements(gl.TRIANGLES, mesh.index_count, gl.UNSIGNED_INT, mesh.index_offset * 4);
        }


        this.draw_spring = function (mvp, rotation, color, shader_type, params) {

            if (color === undefined)
                color = neutral_color;

            let line_arg = [2 / viewport_h, line_offset, viewport_w / viewport_h, 1];

            let line_dim = 0.5;
            let line_color = color.slice();

            line_color[0] *= line_dim;
            line_color[1] *= line_dim;
            line_color[2] *= line_dim;

            let shader = spring_shader;
            let line_shader = spring_line_shader;

            gl.disable(gl.CULL_FACE);

            gl.useProgram(line_shader.shader);

            gl.bindBuffer(gl.ARRAY_BUFFER, basic_vertex_buffer);
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, basic_index_buffer);

            gl.enableVertexAttribArray(line_shader.attributes["tuvw"]);
            gl.vertexAttribPointer(line_shader.attributes["tuvw"], 4, gl.FLOAT, false, 16, 0);

            gl.uniformMatrix4fv(line_shader.uniforms["m_mvp"], false, mat4_transpose(mvp));
            gl.uniform4fv(line_shader.uniforms["line_arg"], line_arg);
            gl.uniform4fv(line_shader.uniforms["color"], line_color);

            if (params)
                gl.uniformMatrix3fv(line_shader.uniforms["params"], false, params);

            gl.drawElements(gl.TRIANGLES, spring_line_index_count, gl.UNSIGNED_INT, spring_line_index_offset * 4);

            gl.useProgram(shader.shader);

            gl.bindBuffer(gl.ARRAY_BUFFER, basic_vertex_buffer);
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, basic_index_buffer);

            gl.enableVertexAttribArray(shader.attributes["tuv"]);
            gl.vertexAttribPointer(shader.attributes["tuv"], 3, gl.FLOAT, false, 12, 0);

            gl.uniformMatrix4fv(shader.uniforms["m_mvp"], false, mat4_transpose(mvp));
            gl.uniformMatrix3fv(shader.uniforms["m_rot"], false, mat3_invert(rotation));

            gl.uniform4fv(shader.uniforms["color"], color);

            if (params)
                gl.uniformMatrix3fv(shader.uniforms["params"], false, params);


            gl.drawElements(gl.TRIANGLES, spring_index_count, gl.UNSIGNED_INT, spring_index_offset * 4);
        }

        this.draw_coil_spring = function (R, r, l, mvp, rotation, color, param) {


            if (!param)
                param = [18, 1.0];

            gl.disable(gl.BLEND);
            gl.depthMask(true);

            let shader = coil_spring_shader;

            gl.disable(gl.CULL_FACE);

            gl.useProgram(shader.shader);

            gl.bindBuffer(gl.ARRAY_BUFFER, basic_vertex_buffer);
            gl.enableVertexAttribArray(shader.attributes["v_position"]);
            gl.vertexAttribPointer(shader.attributes["v_position"], 3, gl.FLOAT, false, 24, 0);
            gl.enableVertexAttribArray(shader.attributes["v_normal"]);
            gl.vertexAttribPointer(shader.attributes["v_normal"], 3, gl.FLOAT, false, 24, 12);


            gl.uniformMatrix4fv(shader.uniforms["m_mvp"], false, mat4_transpose(mvp));
            gl.uniformMatrix3fv(shader.uniforms["m_rot"], false, mat3_invert(rotation));

            gl.uniform4fv(shader.uniforms["color"], color);
            gl.uniform3fv(shader.uniforms["Rrl"], [R, r, l]);
            gl.uniform2fv(shader.uniforms["spring_param"], param);

            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, basic_index_buffer);

            gl.drawElements(gl.TRIANGLE_STRIP, coil_spring_index_count, gl.UNSIGNED_INT, coil_spring_index_offset);

        }

    }


    let gl = new GLDrawer(scale, function () {
        models_ready = true;
        all_drawers.forEach(drawer => {
            drawer.f_draw = true;
            drawer.request_repaint();
        });
    });

    function Drawer(container, mode) {
        let self = this;

        all_drawers.push(self);
        all_containers.push(container);
        container.drawer = this;

        let wrapper = document.createElement("div");
        wrapper.classList.add("canvas_container");
        wrapper.classList.add("non_selectable");

        let canvas = document.createElement("canvas");
        canvas.classList.add("non_selectable");
        canvas.style.position = "absolute";
        canvas.style.top = "0";
        canvas.style.left = "0";

        wrapper.appendChild(canvas);
        container.appendChild(wrapper);

        let play = document.createElement("div");
        play.classList.add("play_pause_button");

        play.onclick = function () {
            self.set_paused(!self.paused);
        }

        this.loading_div = document.createElement("div");
        this.loading_div.classList.add("loading_text");
        this.loading_div.textContent = "Loading...";
        container.appendChild(this.loading_div);



        let load_text = mode === "date_flow" ||
            mode === "torsion_spring3" ||
            mode === "mainspring_wind1" ||
            mode === "mainspring_wind0";

        let animated = mode === "gears_base" ||
            mode === "gears_base2" ||
            mode === "gears_base3" ||
            mode === "crown_wheel_ccw" ||
            mode === "crown_wheel_cw" ||
            mode === "hero" ||
            mode === "date_flow" ||
            mode === "escapement_action" ||
            mode === "gear_train" ||
            mode === "gear_train4" ||
            mode === "gear_train6" ||
            mode === "gear_train7" ||
            mode === "cannon_pinion_action" ||
            mode === "hour_wheel_action" ||
            mode === "stop_lever_interaction" ||
            mode === "crown_wind" ||
            mode === "hero_movement";

        let simulated = mode === "arbor_spring_wind" ||
            mode === "arbor_ratchet_wheel_turn" ||
            mode === "click_spring_flex" ||
            mode === "mainspring_s" ||
            mode === "mainspring_s2" ||
            mode === "mainspring_wind0" ||
            mode === "mainspring_wind1" ||
            mode === "mainspring_wind2" ||
            mode === "crown_wheel_go" ||
            mode === "balance_wheel" ||
            mode === "gear_train2" ||
            mode === "gear_train3" ||
            mode === "shock_protector" ||
            mode === "jumper_interaction" ||
            mode === "jumper_interaction2" ||
            mode === "stop_lever_interaction" ||
            mode === "automatic_gravity";

        let has_reset = mode === "coil_spring" ||
            mode === "torsion_spring" ||
            mode === "torsion_spring2" ||
            mode === "torsion_spring3" ||
            mode === "crown_wheel_go" ||
            mode === "balance_wheel";


        let y_drag_only = mode === "hero_movement" ||
            mode === "gears_base2" ||
            mode === "gears_base3" ||
            mode.startsWith("gear_train");

        let prev_timestamp;
        let t = 0;

        let width, height;

        let arcball;

        let rot = mat3_mul(rot_x_mat3(2.5), rot_z_mat3(-3.4));


        if (mode === "hero_movement") {
            rot = rot_x_mat3(-0.5);

        } else if (mode === "mainspring_lid") {
            rot = mat3_mul(rot_x_mat3(2.1), rot_z_mat3(-3.4));
        } else if (mode === "gear_train5") {
            rot = ident_mat3

        } else if (mode.startsWith("gear_train")) {
            rot = rot_x_mat3(-0.6);
        }
        else if (y_drag_only) {
            rot = rot_x_mat3(2.5);
        } else if (mode === "coil_spring") {
            rot = mat3_mul(rot_x_mat3(-pi * 0.35), rot_z_mat3(-0.9));
        } else if (mode === "hero") {
            rot = mat3_mul(rot_z_mat3(-0.2), mat3_mul(rot_x_mat3(-0.3), mat3_mul(rot_y_mat3(-0.7), rot_z_mat3(-pi * 0.5))));
        } else if (mode === "mainspring_arbor_hook") {
            rot = mat3_mul(rot_x_mat3(2.1), rot_z_mat3(-1));
        } else if (mode === "mainspring_wind2") {
            rot = mat3_mul(rot_x_mat3(5.7), rot_z_mat3(-1));
        } else if (mode === "mainspring_arbor") {
            rot = mat3_mul(rot_x_mat3(2.3), rot_z_mat3(-4.4));
        } else if (mode === "escapement_action" || mode === "escapement_parts") {
            rot = mat3_mul(rot_x_mat3(2.7), rot_z_mat3(-2.4));
        } else if (mode === "jewel") {
            rot = mat3_mul(rot_x_mat3(-0.4), rot_z_mat3(-2.4));
        } else if (mode === "pallet_fork_limits") {
            rot = mat3_mul(rot_x_mat3(2.5), rot_z_mat3(2.5));
        } else if (mode === "pallet_fork_limits") {
            rot = mat3_mul(rot_x_mat3(2.5), rot_z_mat3(2.5));
        } else if (mode === "main_plate_gears2") {
            rot = mat3_mul(rot_x_mat3(2.3), rot_z_mat3(-3.4));
        } else if (mode === "click_rotation" || mode === "click_rotation_spring") {
            rot = mat3_mul(rot_x_mat3(3), rot_z_mat3(-4));
        } else if (mode === "cannon_pinion_assembly" || mode === "cannon_pinion_action" ||
            mode === "hour_wheel_assembly" ||
            mode === "hour_wheel_time_set" || mode === "hour_wheel_time_set2") {
            rot = mat3_mul(rot_x_mat3(5.6), rot_z_mat3(-4));
        } else if (mode === "hour_wheel_action") {
            rot = mat3_mul(rot_x_mat3(6), rot_z_mat3(-pi / 2));
        } else if (mode === "date_assembly") {
            rot = mat3_mul(rot_x_mat3(5.6), rot_z_mat3(-2.5));
        } else if (mode === "date_action") {
            rot = mat3_mul(rot_x_mat3(5.8), rot_z_mat3(-2.5));
        } else if (mode === "stem_crown" || mode === "winding_sliding_pinion" ||
            mode === "sliding_pinion_rotation" ||
            mode === "crown_stem_pinion_assembly" ||
            mode === "corrector_setting_level_assembly" ||
            mode === "setting_wheel_asembly" ||
            mode === "setting_wheel_interaction" ||
            mode === "setting_wheel_sliding_pinion_interaction" ||
            mode === "yoke_asembly" ||
            mode === "jumper_asembly" ||
            mode === "crown_time_set" ||
            mode === "crown_date_set_assembly" ||
            mode === "crown_date_set" ||
            mode === "minute_bridge_assembly") {
            rot = mat3_mul(rot_x_mat3(5.6), rot_z_mat3(-2.5));
        }
        else if (mode === "crown_stem_pinion_turn" ||
            mode === "corrector_setting_level_interaction" ||
            mode === "yoke_interaction" ||
            mode === "jumper_interaction" ||
            mode === "jumper_interaction2") {
            rot = mat3_mul(rot_x_mat3(5.9), rot_z_mat3(-2.5));
        } else if (mode === "corrector_setting_level_interaction1") {
            rot = mat3_mul(rot_x_mat3(5.5), mat3_mul(rot_z_mat3(-2.2), rot_y_mat3(pi)));
        } else if (mode === "stop_lever_interaction" ||
            mode === "crown_wind") {
            rot = mat3_mul(rot_x_mat3(2.9), rot_z_mat3(-3.9));
        } else if (mode === "automatic_behavior" ||
            mode === "automatic_assembly") {
            rot = mat3_mul(rot_x_mat3(5.6), rot_z_mat3(-5));
        } else if (mode === "reversing_wheel_assembly") {
            rot = mat3_mul(rot_x_mat3(2.4), rot_z_mat3(-5));
        } else if (mode === "reversing_wheel_interaction") {
            rot = mat3_mul(rot_x_mat3(pi), rot_z_mat3(-5));
        } else if (mode === "automatic_gravity") {
            rot = mat3_mul(rot_y_mat3(-0.5), mat3_mul(rot_x_mat3(3), rot_z_mat3(-3)));
        } else if (mode === "crown_wheel_ccw" || mode === "crown_wheel_cw") {
            rot = mat3_mul(rot_x_mat3(2.7), rot_z_mat3(-3.4));
        }


        this.paused = true;
        this.requested_repaint = false;
        this.requested_tick = false;

        this.first_draw = true;

        let vp = ident_mat4;
        let proj;
        let ortho_proj;

        function canvas_space(e) {
            let r = canvas.getBoundingClientRect();
            return [(e.clientX - r.left), (e.clientY - r.top)];
        }


        arcball = new ArcBall(rot, function () {
            rot = arcball.matrix.slice();
            request_repaint();
        });

        let sim;
        let sim_slider;



        new TouchHandler(canvas,
            function (e) {
                let p = canvas_space(e);

                if (arcball) {
                    arcball.start(y_drag_only ? width * 0.5 : width - p[0], p[1]);
                }


                return true;
            },
            function (e) {
                let p = canvas_space(e);
                if (arcball) {
                    arcball.update(y_drag_only ? width * 0.5 : width - p[0], p[1], e.timeStamp);
                    rot = arcball.matrix.slice();
                    request_repaint();
                }

                return true;
            },
            function (e) {
                let p = canvas_space(e);
                if (arcball)
                    arcball.end(e.timeStamp);

            });


        this.set_sim_slider = function (x) {
            sim_slider = x;
        }


        this.set_paused = function (p) {

            if (self.paused == p)
                return;

            self.paused = p;

            if (self.paused) {
                play.classList.remove("playing");
            } else {
                play.classList.add("playing");
                if (!self.requested_tick) {
                    self.requested_tick = true;
                    window.requestAnimationFrame(tick);
                }

            }
        }


        this.reset = function () {
            sim = [0, 0, 0, 0, 0, 0];

            if (mode === "crown_date_set") {
                sim[0] = -0.5 * 20;
                sim[1] = -1;
                sim[3] = -4 * pi / 31;

            } else if (mode === "crown_wheel_go") {
                arg0 = 0;
            } else if (mode === "automatic_gravity") {
                sim[2] = pi / 2;
            } else if (mode === "hero" || mode === "hour_wheel_action" || mode === "cannon_pinion_action") {

                let date = new Date;

                let seconds = date.getSeconds();
                let minutes = date.getMinutes();
                let hour = date.getHours();
                let day = date.getDate();

                sim[0] = seconds + minutes * 60 + hour * 60 * 60 + (day - 1) * 24 * 60 * 60;
            }
        }


        function tick(timestamp) {

            self.requested_tick = false;

            let rect = canvas.getBoundingClientRect();

            let wh = window.innerHeight || document.documentElement.clientHeight;
            let ww = window.innerWidth || document.documentElement.clientWidth;
            if (!(rect.top > wh || rect.bottom < 0 || rect.left > ww || rect.right < 0)) {

                let dt = 0;
                if (prev_timestamp)
                    dt = (timestamp - prev_timestamp) / 1000;

                dt = Math.min(dt, 1.0 / 20.0);

                t += dt;

                self.repaint(dt);
            }
            prev_timestamp = timestamp;

            if (self.paused)
                prev_timestamp = undefined;
            else
                window.requestAnimationFrame(tick);
        }

        if (animated) {
            wrapper.appendChild(play);
            animated_drawers.push(this);
        }

        if (has_reset) {

            let reset = document.createElement("div");
            reset.classList.add("restart_button");

            reset.onclick = function () {
                self.reset();
                self.set_paused(false);
            }

            wrapper.appendChild(reset);

        }

        if (simulated) {
            this.set_paused(false);
            window.requestAnimationFrame(tick);
        }


        function request_repaint() {
            if (!self.requested_repaint && (self.f_draw || self.paused)) {
                self.requested_repaint = true;
                window.requestAnimationFrame(function () {
                    self.repaint();
                });
            }
        }

        this.set_visible = function(x) {
            this.visible = x;
            if (x && !this.was_drawn)
                request_repaint();
        }

        let arg0 = 0,
            arg1 = 0,
            arg2 = 0;

        this.set_arg0 = function (x) {
            arg0 = x;
            if (simulated)
                this.set_paused(false);
            request_repaint();
        }
        this.set_arg1 = function (x) {
            arg1 = x;
            if (simulated)
                this.set_paused(false);
            request_repaint();
        }
        this.set_arg2 = function (x) {
            arg2 = x;
            if (simulated)
                this.set_paused(false);
            request_repaint();
        }

        this.set_rot = function (x) {
            rot = x;

            if (arcball)
                arcball.set_matrix(x);

            request_repaint();
        }

        this.request_repaint = request_repaint;


        this.reset();

        this.on_resize = function () {
            let new_width = wrapper.clientWidth;
            let new_height = wrapper.clientHeight;

            if (new_width != width || new_height != height) {

                width = new_width;
                height = new_height;


                canvas.style.width = width + "px";
                canvas.style.height = height + "px";
                canvas.width = width * scale;
                canvas.height = height * scale;

                let aspect = 1;

                let proj_w = 13.50;
                let proj_h = proj_w / aspect;

                ortho_proj = [1 / proj_w, 0, 0, 0,
                    0, 1 / proj_h, 0, 0,
                    0, 0, -0.015, 0,
                    0, 0, 0, 1
                ]


                let fov = Math.PI * 0.1;
                let near = 50.0;
                let far = 170.0;

                let f = 1.0 / Math.tan(fov / 2);
                let rangeInv = 1 / (near - far);

                proj = [
                    f / aspect, 0, 0, 0,
                    0, f, 0, 0,
                    0, 0, (near + far) * rangeInv, -1,
                    0, 0, near * far * rangeInv * 2, 0
                ];

                proj = mat4_transpose(proj);
                proj = mat4_mul(proj, translation_mat4([0, 0, -87]));


                let pad = 5;
                let a_size = Math.max(width, height) - pad * 2;

                if (arcball)
                    arcball.set_viewport(width / 2 - a_size / 2 + pad,
                        height / 2 - a_size / 2 + pad,
                        a_size, a_size);

                request_repaint();
            }
        }

        function reverse_sim_params(sim0, sim1) {
            let b0 = sim0[3];
            let b1 = -b0;

            if (sim0[5]) {
                sim1[3] = b1;
            } else if (sim1[5]) {
                b1 = sim1[3];
                b0 = sim0[3] = -sim1[3];
            }

            b1 = -b0 + 0.01;

            let rev0_l0 = sim0[1];
            let rev0_l1 = sim0[2];
            let rev1_l0 = sim1[1];
            let rev1_l1 = sim1[2];

            let p = [];
            p[0] = b0;
            p[1] = b1;
            p[2] = rev0_l0;
            p[3] = rev0_l1;
            p[4] = rev1_l0;
            p[5] = rev1_l1;

            return p;
        }

        function sim_reverse_gear(sim, top_angle, cw) {

            let prev_top_angle = sim[0];
            let prev_lever0_angle = sim[1];
            let prev_lever1_angle = sim[2];
            let bottom_angle = sim[3];


            let da = top_angle - prev_top_angle;


            let l0_tt = ((top_angle - bottom_angle) * 7 / (2 * pi));

            l0_tt = l0_tt % 1;


            if (l0_tt < 0)
                l0_tt += 1;

            let l1_tt = (l0_tt + 0.5) % 1


            if (sim[5] && ((cw && da < 0) || (!cw && da > 0))) {
                l0_tt = sim[4][0];
                l1_tt = sim[4][1];
                bottom_angle += da;
            } else {
                sim[5] = 0;
            }


            let lever_min = cw ? function (tt) {
                let lever_angle = -0.14;

                lever_angle += sharp_step(0.0, 0.12, tt) * 0.07;
                lever_angle += sharp_step(0.12, 0.16, tt) * 0.03;
                lever_angle += sharp_step(0.16, 0.24, tt) * 0.03;
                lever_angle += sharp_step(0.24, 0.34, tt) * 0.01;
                lever_angle -= sharp_step(0.46, 0.5, tt) * 0.01;
                lever_angle -= sharp_step(0.53, 0.88, tt) * 0.12;
                lever_angle -= sharp_step(0.9, 0.98, tt) * 0.01;


                return lever_angle;
            } : function (tt) {
                let lever_angle = -0.02;


                lever_angle += sharp_step(0.84, 0.67, tt) * 0.08;
                lever_angle += sharp_step(0.66, 0.6, tt) * 0.015;
                lever_angle -= (1 - step(0.48, tt)) * 0.095;


                return lever_angle;
            }

            let lever_max = cw ? function (tt) {
                let lever_angle = 0.02;


                lever_angle -= sharp_step(0.65, 0.84, tt) * 0.08;
                lever_angle -= sharp_step(0.84, 0.9, tt) * 0.015;
                lever_angle -= (1 - step(0.02, tt)) * 0.095;


                return lever_angle;
            } : function (tt) {
                let lever_angle = 0.01;

                lever_angle += sharp_step(0.96, 0.92, tt) * 0.01;
                lever_angle += sharp_step(0.92, 0.6, tt) * 0.11;
                lever_angle += sharp_step(0.6, 0.52, tt) * 0.01;
                lever_angle -= sharp_step(0.52, 0.24, tt) * 0.13;
                lever_angle -= sharp_step(0.24, 0.1, tt) * 0.02;
                lever_angle += sharp_step(0.1, 0.0, tt) * 0.02;

                return lever_angle;
            }

            let lever0_angle = clamp(prev_lever0_angle, lever_min(l0_tt), lever_max(l0_tt));
            let lever1_angle = clamp(prev_lever1_angle, lever_min(l1_tt), lever_max(l1_tt));


            if (!sim[5]) {

                if (da < 0 && cw) {

                    if ((prev_lever0_angle > -0.03 && (l0_tt < 0.04 || l0_tt > sim[4][0]) && sim[4][0] >= 0.04) ||
                        (prev_lever0_angle > -0.03 && (l1_tt < 0.04 || l1_tt > sim[4][1]) && sim[4][1] >= 0.04)
                    ) {
                        l0_tt = 0.04;
                        l1_tt = 0.04;

                        lever0_angle = clamp(prev_lever0_angle, lever_min(l0_tt), lever_max(l0_tt));
                        lever1_angle = clamp(prev_lever1_angle, lever_min(l1_tt), lever_max(l1_tt));
                        sim[5] = 1;

                        bottom_angle = (Math.floor((bottom_angle - top_angle) * 14 / (2 * pi)) + (-l0_tt + 0.5) * 2) / (14 / (2 * pi)) + top_angle;
                    }
                } else if (da > 0 && !cw) {
                    if ((prev_lever0_angle < 0.03 && l0_tt >= 0.46 && sim[4][0] < 0.46) ||
                        (prev_lever1_angle < 0.03 && l1_tt >= 0.46 && sim[4][1] < 0.46)) {
                        l0_tt = 0.46;
                        l1_tt = 0.46;

                        lever0_angle = clamp(prev_lever0_angle, lever_min(l0_tt), lever_max(l0_tt));
                        lever1_angle = clamp(prev_lever1_angle, lever_min(l1_tt), lever_max(l1_tt));
                        sim[5] = 1;

                        bottom_angle = (Math.floor((bottom_angle - top_angle) * 14 / (2 * pi)) + (-l0_tt + 0.5) * 2) / (14 / (2 * pi)) + top_angle;
                    }
                }
            }

            sim[0] = top_angle;
            sim[1] = lever0_angle;
            sim[2] = lever1_angle;
            sim[3] = bottom_angle;
            sim[4] = [l0_tt, l1_tt];

        }

        function sim_crown_pull(dt, pause = true) {

            const l0 = 0;
            const l1 = 0.4;
            const l2 = 1;

            const tt = 5;

            if (sim_slider.dragged) {
                if (pause)
                    self.set_paused(false);
                sim[0] = arg0;
            } else if (sim[0] == l0 || sim[0] == l1 || sim[0] == l2) {
                if (pause)
                    self.set_paused(true);
            } else {
                if (sim[0] < 0.2)
                    sim[0] = Math.max(sim[0] - tt * dt, 0);
                else if (sim[0] > 0.56) {
                    sim[0] = Math.min(sim[0] + tt * dt, l2);
                } else if (sim[0] < l1) {
                    sim[0] = Math.min(sim[0] + tt * dt, l1);
                } else {
                    sim[0] = Math.max(sim[0] - tt * dt, l1);
                }
                sim_slider.set_value(sim[0]);

                arg0 = sim[0];
            }
        }



        function sim_crown_wind(as) {

            let da = (arg0 - sim[0]) * as;
            if (da > 0) {

                if (sim[2] == 0) {
                    sim[1] += -da;
                } else {
                    sim[2] -= da;

                    if (sim[2] < 0) {
                        sim[1] += sim[2];
                        sim[2] = 0
                    }
                }

            } else {
                sim[2] -= da;
                sim[2] = sim[2] % (pi * 2 / 9);
            }

            sim[0] = arg0;
        }



        this.repaint = function (dt) {

            if (dt === undefined)
                dt = 0;

            self.requested_repaint = false;

            if (!self.visible)
                return;

            if (width == 0 || height == 0)
                return;

            vp = mat4_mul(proj, mat3_to_mat4(rot));

            let ctx = canvas.getContext("2d");


            ctx.resetTransform();
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.scale(scale, scale);
            ctx.setLineDash([]);

            let base_line_width = 1.5;


            let font_size = 22;

            if (window.innerWidth < 500)
                font_size = 20;

            if (window.innerWidth < 400)
                font_size = 18;


            ctx.lineCap = "round";
            ctx.lineJoin = "round";
            ctx.lineWidth = base_line_width;

            ctx.font = font_size + "px IBM Plex Sans";
            ctx.textAlign = "center";
            ctx.globalAlpha = 1.0;
            ctx.globalCompositeOperation = "source-over";


            if (!models_ready) {
                return;
            } else if (self.loading_div) {
                self.loading_div.remove();
                self.loading_div = undefined;
            }

            self.first_draw = false;
            self.f_draw = false;

            if (mode === "hero") {
                sim[0] += dt;


                let dd = [0, 1, 0];
                dd = mat3_mul_vec(mat3_invert(rot), dd);

                let a = sim[2];
                let w = sim[3];

                let dir = [Math.cos(a), Math.sin(a)];
                let f = dir[0] * dd[1] - dir[1] * dd[0];


                w += f * dt * 200 - w * 6 * dt;
                a += w * dt;

                sim[3] = w;
                sim[2] = a;

                let weight_angle = a - pi / 2;

                if (sim[4] == 0) {
                    sim[4] = [0, 0, 0, 0, 0];
                    sim[5] = [0, 0, 0, 0, 0];
                }


                let t0 = -weight_angle * wweight_n / wrev_t_n + 0.13;
                let t1 = -weight_angle * wweight_n / wrev_t_n + 0.16;


                sim_reverse_gear(sim[4], t0, false);
                sim_reverse_gear(sim[5], t1, true);

                let z = arg0 * 0.6;

                let mvp = mat4_mul(mat4_mul(vp, translation_mat4([0, 0, smooth_step(0, 1, z) * 2.8])), scale_mat4(0.8 - Math.pow(smooth_step(0, 1, z), 0.7) * 0.42));

                let tt = smooth_step(0, 1, z) * 2;

                let colors = {};
                Object.assign(colors, keyless_colors);
                Object.assign(colors, train_colors);

                {
                    colors["Hour_wheel"] = yellow_color;
                    colors["Date_indicator_gear"] = green_color;
                    colors["Date_indicator_cover"] = green_color;
                    colors["Date_indicator_spring"] = orange_color;
                    colors["Date_jumper_gears"] = blue_color;
                    colors["Date_jumper"] = red_color;

                    colors["Cannon_wheel"] = blue_color;
                    colors["Cannon_pinion"] = green_color;
                    colors["Intermediate_wheel"] = red_color;
                    colors["Click"] = blue_color;
                    colors["Crown_wheel"] = yellow_color;
                    colors["Click_spring"] = red_color;
                    colors["Ratchet_wheel"] = green_color;
                    colors["Stop_lever"] = cyan_color;
                }

                gl.begin(width, height);

                gl.set_line_offset(-0.0005);

                draw_complete_assembly(mvp, rot, 200, colors, {

                    "Cannon_wheel": tt * 2,
                    "Cannon_pinion": tt * 2,
                    "Date_jumper": tt * 2,

                    "Intermediate_wheel": tt * 3,
                    "Setting_wheel": tt * 3,
                    "Date_indicator": tt * 3,
                    "Hour_wheel": tt * 4,


                    "Corrector_lever": tt * 2,
                    "Setting_lever": tt * 3,
                    "Yoke": tt * 4,
                    "Setting_lever_jumper": tt * 5,
                    "Setting_lever_jumper_screw": tt * 6,

                    "Date_corrector": tt * 6,

                    "Date_ring": tt * 7,
                    "Date_jumper_plate": tt * 8,
                    "Date_jumper_plate_screw": tt * 9,

                    "Minute_train_bridge": tt * 8,
                    "Minute_train_bridge_screw": tt * 9,

                    "Dial": tt * 10,
                    "Hour_hand": tt * 10.2,
                    "Minute_hand": tt * 10.4,
                    "Second_hand": tt * 10.6,



                    "Pallet_fork": -tt * 2,
                    "Escape": -tt * 2,
                    "Pallet_bridge": -tt * 3,
                    "Pallet_bridge_screw": -tt * 4,
                    "Second": tt * -2,
                    "First": tt * -3,
                    "Third": tt * -4,
                    "Fourth": tt * -5,

                    "Train_bridge": -tt * 7,
                    "Train_bridge_screw": -tt * 8,
                    "Balance_assembly_z": -tt * 8,
                    "Balance_screw": -tt * 9,

                    "Stop_lever": -tt * 6,
                    "Barrel_bridge": -tt * 9,
                    "Barrel_bridge_screw": -tt * 10,

                    "Ratchet_wheel": -tt * 11,
                    "Ratchet_wheel_screw": -tt * 12,
                    "Click": -tt * 11,
                    "Click_spring": -tt * 12,
                    "Crown_wheel": -tt * 13,
                    "Crown_wheel_screw": -tt * 14,


                    "Automatic_device_bridge_screw": -tt * 10,
                    "Automatic_device_bridge": -tt * 11,

                    "Reverse_gear0": -tt * 12,
                    "Reverse_gear1": -tt * 13,
                    "Automatic_gear0": -tt * 14,
                    "Automatic_gear1": -tt * 15,

                    "Automatic_device_framework": -tt * 16,

                    "Automatic_device_framework_screw0": -tt * 17,
                    "Automatic_device_framework_screw1": -tt * 17,
                    "Weight": -tt * 18,
                    "Weight_screw": -tt * 19,

                }, {
                    "balance_time": sim[0],
                    "show_date_ring": true,
                    "show_second_hand": true,
                    "show_minute_hand": true,
                    "show_hour_hand": true,
                    "show_dial": true,
                    "Weight_angle": weight_angle,
                    "auto_params": reverse_sim_params(sim[4], sim[5])
                });
                ctx.drawImage(gl.finish(), 0, 0, width, height);
            } else if (mode === "gears_base") {

                let a = t * 0.5;
                let sc = 3.2;

                gl.begin(width, height);
                let mvp = mat4_mul(vp, scale_mat4(sc));
                mvp = mat4_mul(mvp, translation_mat4([0.4, -0.2, 0]));


                {
                    let m = mat4_mul(mvp, translation_mat4([3.7928 - 0.7, 0, 0]));
                    m = mat4_mul(m, rot_z_mat4(-a * w21_n / w30_n));

                    let r = mat3_mul(rot, rot_z_mat3(-a * w21_n / w30_n));

                    gl.draw_gear_teeth_mesh("w30", mat4_mul(m, translation_mat4([0, 0, 0])), r, yellow_color);

                    gl.draw_mesh("Cylinder", mat4_mul(m, mat4_mul(translation_mat4([0, 0, 0.6]),
                        scale_mat4([0.12, 0.12, 0.3])
                    )), r, yellow_color);

                    gl.draw_mesh("Cylinder", mat4_mul(m, mat4_mul(translation_mat4([0, 0, -0.3]),
                        scale_mat4([0.12, 0.12, 0.3])
                    )), r, yellow_color);


                    gl.draw_mesh("Cylinder", mat4_mul(m, mat4_mul(translation_mat4([0.3, 0, 0.35]),
                        scale_mat4([0.05, 0.05, 0.7])
                    )), r, digit_color);
                }

                {
                    let m = mat4_mul(mvp, translation_mat4([- 0.7, 0, 0]));
                    m = mat4_mul(m, rot_z_mat4(a));

                    let r = mat3_mul(rot, rot_z_mat3(a));

                    gl.draw_mesh("Second_wheel", mat4_mul(m, translation_mat4([0, 0, 6.7])), r, red_color);

                    gl.draw_gear_teeth_mesh("w21", mat4_mul(m, translation_mat4([0, 0, -0.06])), r, red_color);

                    gl.draw_mesh("Cylinder", mat4_mul(m, mat4_mul(translation_mat4([0, 0, 0.28]),
                        scale_mat4([0.14, 0.14, 0.28])
                    )), r, red_color);


                    gl.draw_mesh("Cylinder", mat4_mul(m, mat4_mul(translation_mat4([0, 0, -0.82]),
                        scale_mat4([0.14, 0.14, 0.4])
                    )), r, red_color);

                    gl.draw_mesh("Cylinder", mat4_mul(m, mat4_mul(translation_mat4([0, 0, -0.12]),
                        scale_mat4([0.27, 0.27, 0.7])
                    )), r, red_color);

                    gl.draw_mesh("Cylinder", mat4_mul(m, mat4_mul(translation_mat4([0, 0, 0.72]),
                        scale_mat4([0.27, 0.27, 0.7])
                    )), r, red_color);

                    gl.draw_mesh("Cylinder", mat4_mul(m, mat4_mul(translation_mat4([0, 0, 1.12]),
                        scale_mat4([0.14, 0.14, 0.4])
                    )), r, red_color);

                    gl.draw_mesh("Cylinder", mat4_mul(m, mat4_mul(translation_mat4([3.0, 0, 0.05]),
                        scale_mat4([0.05, 0.05, 0.2])
                    )), r, digit_color);

                    gl.draw_mesh("Arrow_curve", mat4_mul(mat4_mul(mat4_mul(m, translation_mat4([0, 0, -0.2])), scale_mat4([0.2, 0.2, 0.2])), mat4_mul(rot_z_mat4(-pi * 0.5), rot_y_mat4(pi))), mat3_mul(rot, mat3_mul(rot_z_mat3(pi * 0.5), rot_y_mat3(pi))), neutral_color)

                }

                ctx.drawImage(gl.finish(), 0, 0, width, height);
            } else if (mode === "gears_base2") {

                let a = t;
                let sc = 1.6;



                gl.begin(width, width);


                {
                    let mvp = mat4_mul(vp, scale_mat4(sc));
                    mvp = mat4_mul(mvp, translation_mat4([-2, 0, 0]));
                    mvp = mat4_mul(mvp, rot_z_mat4(a));

                    let r = mat3_mul(rot, rot_z_mat3(a));

                    gl.draw_gear_teeth_mesh("wgear1", mat4_mul(mvp, translation_mat4([0, 0, 0])), r, red_color);

                    gl.draw_mesh("Cylinder", mat4_mul(mvp, mat4_mul(translation_mat4([0, 0, -0.3]),
                        scale_mat4([0.2, 0.2, 0.7])
                    )), r, red_color);

                    gl.draw_mesh("Cylinder", mat4_mul(mvp, mat4_mul(translation_mat4([0, 0, 1.0]),
                        scale_mat4([0.2, 0.2, 0.7])
                    )), r, red_color);

                    gl.draw_mesh("Cylinder", mat4_mul(mvp, mat4_mul(translation_mat4([1.6, 0, 0.35]),
                        scale_mat4([0.1, 0.1, 0.7])
                    )), r, digit_color);

                    gl.draw_mesh("Arrow_curve", mat4_mul(mat4_mul(mat4_mul(mvp, translation_mat4([0, 0, -0.4])), scale_mat4(0.25)), mat4_mul(rot_z_mat4(pi * 0.5), rot_y_mat4(pi))), mat3_mul(rot, mat3_mul(rot_z_mat3(-pi * 0.5), rot_y_mat3(pi))), neutral_color)

                }

                {
                    let names = ["wgear2", "wgear1", "wgear0"];
                    let ns = [wgear2_n, wgear1_n, wgear0_n];

                    let ratio = wgear1_n / ns[arg1];

                    a = -a * ratio + pi / ns[arg1];

                    let mvp = mat4_mul(vp, scale_mat4(sc));
                    mvp = mat4_mul(mvp, translation_mat4([2 / ratio, 0, 0]));
                    mvp = mat4_mul(mvp, rot_z_mat4(a));

                    let r = mat3_mul(rot, rot_z_mat3(a));

                    gl.draw_gear_teeth_mesh(names[arg1], mvp, r, yellow_color);

                    gl.draw_mesh("Cylinder", mat4_mul(mvp, mat4_mul(translation_mat4([0, 0, 1.0]),
                        scale_mat4([0.2, 0.2, 0.7])
                    )), r, yellow_color);

                    gl.draw_mesh("Cylinder", mat4_mul(mvp, mat4_mul(translation_mat4([0, 0, -0.3]),
                        scale_mat4([0.2, 0.2, 0.7])
                    )), r, yellow_color);

                    mvp = mat4_mul(mvp, rot_z_mat4(-pi / ns[arg1]));

                    gl.draw_mesh("Cylinder", mat4_mul(mvp, mat4_mul(translation_mat4([-2 / ratio + 0.4, 0, 0.35]),
                        scale_mat4([0.1, 0.1, 0.7])
                    )), r, digit_color);

                }


                ctx.drawImage(gl.finish(), 0, Math.round((- width + height) * 0.5), width, width);

            } else if (mode === "gears_base3") {

                let a = t * 0.008;
                let sc = smooth_lerp(2, 0.018, Math.sqrt(arg0));

                let ratio = wgear0_n / wgear3_n;


                gl.begin(width, width);



                {
                    let mvp = mat4_mul(scale_mat4([1, 1, 0.08]), mat4_mul(vp, scale_mat4(sc)));
                    mvp = mat4_mul(mvp, translation_mat4([-1 / ratio, 0, 0]));
                    mvp = mat4_mul(mvp, rot_z_mat4(a));

                    let r = mat3_mul(rot, rot_z_mat3(a));

                    gl.set_line_offset(-0.0001);

                    gl.draw_gear_teeth_mesh("wgear3", mat4_mul(mvp, translation_mat4([0, 0, 0])), r, red_color, 1, undefined, undefined);

                    gl.draw_mesh("Cylinder", mat4_mul(mvp, mat4_mul(translation_mat4([0, 0, -0.3]),
                        scale_mat4([0.2, 0.2, 0.7])
                    )), r, red_color);

                    gl.draw_mesh("Cylinder", mat4_mul(mvp, mat4_mul(translation_mat4([0, 0, 1.0]),
                        scale_mat4([0.2, 0.2, 0.7])
                    )), r, red_color);

                    gl.draw_mesh("Cylinder", mat4_mul(mvp, mat4_mul(translation_mat4([1 / ratio - 0.4, 0, 0.35]),
                        scale_mat4([0.1, 0.1, 0.7])
                    )), r, digit_color, 1, undefined, undefined);

                    gl.draw_mesh("Arrow_curve", mat4_mul(mat4_mul(mat4_mul(mvp, translation_mat4([0, 0, -4.0])), scale_mat4([30, 30, 10])), mat4_mul(rot_z_mat4(-pi * 0.5), rot_y_mat4(pi))), mat3_mul(rot, mat3_mul(rot_z_mat3(pi * 0.5), rot_y_mat3(pi))), neutral_color, 1, undefined, undefined)

                }

                {

                    a = -a / ratio + pi / wgear0_n;

                    let mvp = mat4_mul(scale_mat4([1, 1, 0.08]), mat4_mul(vp, scale_mat4(sc)));
                    mvp = mat4_mul(mvp, translation_mat4([1, 0, 0]));
                    mvp = mat4_mul(mvp, rot_z_mat4(a));

                    let r = mat3_mul(rot, rot_z_mat3(a));

                    gl.draw_gear_teeth_mesh("wgear0", mvp, r, yellow_color, 1, undefined, undefined);

                    gl.draw_mesh("Cylinder", mat4_mul(mvp, mat4_mul(translation_mat4([0, 0, 1.0]),
                        scale_mat4([0.2, 0.2, 0.7])
                    )), r, yellow_color, 1, undefined, undefined);

                    gl.draw_mesh("Cylinder", mat4_mul(mvp, mat4_mul(translation_mat4([0, 0, -0.3]),
                        scale_mat4([0.2, 0.2, 0.7])
                    )), r, yellow_color, 1, undefined, undefined);

                    mvp = mat4_mul(mvp, rot_z_mat4(-pi / wgear3_n));

                    gl.draw_mesh("Cylinder", mat4_mul(mvp, mat4_mul(translation_mat4([1 - 0.4, 0, 0.35]),
                        scale_mat4([0.1, 0.1, 0.7])
                    )), r, digit_color, 1, undefined, undefined);

                }


                ctx.drawImage(gl.finish(), 0, Math.round((- width + height) * 0.5), width, width);

                ctx.feather(width * scale, height * scale,
                    canvas.height * 0.15, canvas.height * 0.15,
                    canvas.height * 0.15, canvas.height * 0.15);

            } else if (mode === "gear_train" || mode === "gear_train2" || mode === "gear_train3" ||
                mode === "gear_train4" || mode === "gear_train5" || mode === "gear_train7" ||
                mode === "gear_train6" || mode === "hero_movement") {

                let tr = 8.7;
                let sc = 1.05;

                if (mode === "gear_train2") {
                    if (sim_slider.dragged) {

                        sim[4] += arg0 - sim[0];

                        sim[0] = arg0;
                        sim[1] = 0;

                        self.set_paused(false);
                    } else if (sim[0] != 0) {

                        sim[1] += -0.1 * dt;
                        sim[0] += sim[1] * dt;

                        sim[0] = Math.max(0, sim[0]);
                        sim_slider.set_value(sim[0]);

                        sim[3] = -sim[4] + sim[0];

                        arg0 = sim[0];

                    } else {
                        self.set_paused(true);
                    }


                    sc = 0.94;
                    tr = 6.9;

                } else if (mode === "gear_train3") {
                    tr = 6;
                    sc = 0.9;
                } else if (mode === "gear_train7") {
                    tr = -8;
                    sc = 5;
                } else if (mode === "gear_train4" || mode === "gear_train6" || mode === "hero_movement") {
                    tr = 3.1;
                    sc = 0.75;
                }


                let mvp = mat4_mul(vp, scale_mat4(sc));
                mvp = mat4_mul(mvp, translation_mat4([tr, 0, 0]));

                if (mode === "gear_train5") {
                    rot = ident_mat3;

                    mvp = mat4_mul(ortho_proj, mat3_to_mat4(rot));
                    mvp = mat4_mul(mvp, scale_mat4(4));
                    mvp = mat4_mul(mvp, translation_mat4([-7, 0, 0]));
                }

                gl.begin(width, width);

                if (mode === "gear_train") {
                    sim[0] += dt * (arg0 * arg0) * 220;
                }

                let escape_angle = sim[0];
                let fork_angle = 0;
                let corrected_balance_angle = 0;

                let hh = 0;

                if (mode === "gear_train2") {

                    let ra = -sim[0] * (42.86);
                    let rb = sim[3] * (42.86);


                    let values = mainspring_values(sim[0], ra);
                    gl.update_mainspring_buffer(values, 0.06);
                    gl.update_mainspring_buffer(mainspring_end_values(values), 0.06, true);

                    escape_angle = -(sim[3]) * (42.86) / (w50_n / w41_n * w40_n / w31_n * w30_n / w21_n * w20_n / w11_n);

                    {
                        let m = mvp;
                        m = mat4_mul(m, rot_x_mat4(pi));

                        let r = rot;
                        r = mat3_mul(r, rot_x_mat3(pi));

                        gl.draw_mesh("Mainspring_base", mat4_mul(mat4_mul(m, translation_mat4([-3.7203 - 3.7928 - 7.0313, 0, 18.85 + 0.92 - 0.4])), rot_z_mat4(ra + rb)), mat3_mul(r, rot_z_mat3(ra + rb)), gray_color);


                        gl.draw_mainspring(mat4_mul(m, mat4_mul(mat4_mul(translation_mat4([-3.7203 - 3.7928 - 7.0313, 0, -0.4]), scale_mat4([1, 1, 0.5])),
                            rot_z_mat4(base_spring_angle + ra + rb))),
                            mat3_mul(r, rot_z_mat3(base_spring_angle + ra + rb)),
                            gray_color);

                        gl.draw_mainspring(mat4_mul(m, mat4_mul(mat4_mul(translation_mat4([-3.7203 - 3.7928 - 7.0313, 0, -0.4]), scale_mat4([1, 1, 0.5])),
                            rot_z_mat4(base_spring_angle + ra + rb))),
                            mat3_mul(r, rot_z_mat3(base_spring_angle + ra + rb)),
                            blue_color, true);
                    }

                    draw_barrel_arbor(mat4_mul(mvp, translation_mat4([-5.78 - 3.7203 - 3.7928 - 7.0313, -2.89, 0])), rot, -ra - rb, yellow_color);


                } else if (mode === "gear_train3") {

                    if (sim[3] != arg0) {
                        sim[3] = arg0;
                        sim[0] = 1;
                    }

                    if (sim[0] == 1) {
                        sim[1] += dt * 0.5;

                        if (sim[1] >= 0.125) {
                            sim[1] = 0;
                            sim[0] = 0;
                            sim[2] += 0.125;
                        }
                    }

                    let params = balance_params(sim[2] + sim[1] + 0.125 / 2);
                    escape_angle = params[0];
                    fork_angle = params[1];
                    corrected_balance_angle = params[2];


                } else if (mode === "gear_train4" || mode === "gear_train7") {

                    sim[0] += dt * arg0 * arg0;

                    let params = balance_params(sim[0]);
                    escape_angle = params[0];
                    fork_angle = params[1];
                    corrected_balance_angle = params[2];
                } else if (mode === "gear_train5") {

                    let params = balance_params(arg0 * 0.05 + 0.125 * 0.5 - 0.03 - 0.125 * 0.5 + 0.13);
                    escape_angle = params[0];
                    fork_angle = params[1];
                    corrected_balance_angle = params[2];
                } else if (mode === "hero_movement" || mode === "gear_train6") {
                    let params = balance_params(t);
                    escape_angle = params[0];
                    fork_angle = params[1];
                    corrected_balance_angle = params[2];
                }

                if (mode !== "gear_train2")
                    draw_barrel_arbor(mat4_mul(mvp, translation_mat4([-5.78 - 3.7203 - 3.7928 - 7.0313, -2.89, 0])), rot, 0, red_color);

                if (mode !== "gear_train") {
                    gl.draw_mesh("Second_hand", mat4_mul(mat4_mul(mvp, translation_mat4([0, 0, 124.8])),
                        rot_z_mat4(-escape_angle * w50_n / w41_n + 1.4)), rot, hand_color, 1, "axial_resize", [0, 1, 7, 0.5]);
                }

                draw_first_wheel(mat4_mul(mvp, translation_mat4([-5.78 - 3.7203 - 3.7928 - 7.0313, -2.89, 0])), rot, escape_angle * w50_n / w41_n * w40_n / w31_n * w30_n / w21_n * w20_n / w11_n, false, mode === "gear_train2", red_color);
                draw_second_wheel(mat4_mul(mvp, translation_mat4([-6.025 - 3.7203 - 3.7928, 4.137, 0])), rot, -escape_angle * w50_n / w41_n * w40_n / w31_n * w30_n / w21_n, orange_color);
                draw_third_wheel(mat4_mul(mvp, translation_mat4([-2.489 - 3.7203, 2.765, 0])), rot, escape_angle * w50_n / w41_n * w40_n / w31_n, yellow_color);
                draw_fourth_wheel(mat4_mul(mvp, translation_mat4([0, 0, 0])), rot, -escape_angle * w50_n / w41_n, green_color);

                if (mode !== "gear_train2")
                    gl.draw_mesh("Arrow_curve", mat4_mul(mat4_mul(mat4_mul(mvp, translation_mat4([-3.7203 - 3.7928 - 7.0313, 0, 2.0])), scale_mat4([0.5, 0.5, 0.3])), mat4_mul(rot_z_mat4(-pi * 0.5), rot_y_mat4(pi))), mat3_mul(rot, mat3_mul(rot_z_mat3(pi * 0.5), rot_y_mat3(pi))), neutral_color)



                if (mode !== "gear_train" && mode !== "gear_train2") {



                    let mat = translation_mat4([2.072, 3.03, 0]);
                    mat = mat4_mul(rot_z_mat4(pi + 37.2576 * pi / 180), mat);
                    mat = mat4_mul(translation_mat4([3.6707, 0, 0]), mat);

                    let r = mat3_mul(rot, rot_z_mat3(pi + 37.2576 * pi / 180));

                    mvp = mat4_mul(mvp, mat);
                    draw_escape_wheel(mvp, r, escape_angle, cyan_color);
                    draw_pallet_fork(mvp, r, fork_angle, blue_color, mode === "gear_train7" ? yellow_color : undefined);

                    if (mode !== "gear_train3") {

                        draw_balance_wheel(mvp, r, corrected_balance_angle, violet_color, mode === "gear_train7" ? green_color : undefined);
                        draw_hairspring(mvp, r, corrected_balance_angle, 0);
                    }



                    draw_pallet_fork_jewels(mvp, r, fork_angle, true);

                    if (mode !== "gear_train3") {

                        draw_balance_wheel_jewel(mvp, r, corrected_balance_angle, true);
                    }

                }

                ctx.drawImage(gl.finish(), 0, Math.round((- width + height) * 0.5), width, width);

                if (mode === "gear_train7") {
                    ctx.feather(width * scale, height * scale,
                        canvas.height * 0.1, canvas.height * 0.1,
                        canvas.height * 0.1, canvas.height * 0.1);

                } else if (mode === "gear_train5") {


                    ctx.feather(width * scale, height * scale,
                        canvas.height * 0.1, canvas.height * 0.1,
                        canvas.height * 0.1, canvas.height * 0.1);

                    for (let i = 0; i < gear_train5_explainers.length; i++)
                        gear_train5_explainers[i].style.display = "none";

                    let prog = [
                        -0.1,
                        0.38,
                        0.48,
                        0.57,
                        0.62,
                        0.7,
                        1.2
                    ]

                    let i = 0;
                    for (; i < prog.length; i++) {
                        if (arg0 < prog[i])
                            break;
                    }

                    let tt = (arg0 - prog[i - 1]) / (prog[i] - prog[i - 1]);
                    let a = smooth_step(0, 0.1, tt) - smooth_step(0.9, 1.0, tt);


                    gear_train5_explainers[i - 1].style.opacity = a;
                    gear_train5_explainers[i - 1].style.display = "block";

                    ctx.globalAlpha = a;
                    let w = width;
                    let h = height;


                    ctx.fillStyle = "rgba(0,0,0,0.7)"
                    ctx.strokeStyle = "#eee";
                    ctx.lineWidth = 2;

                    ctx.beginPath();
                    if (i == 2) {

                        ctx.arrow(0.647 * w, 0.6 * w,
                            0.747 * w, 0.5 * w,
                            w * 0.02, w * 0.06, h * 0.06);
                    } else if (i == 3) {
                        ctx.arrow(0.44 * w, 0.44 * w,
                            0.34 * w, 0.34 * w,
                            w * 0.02, w * 0.06, h * 0.06);
                    } else if (i == 4) {

                        ctx.arrow(0.65 * w, 0.37 * w,
                            0.75 * w, 0.47 * w,
                            w * 0.02, w * 0.06, h * 0.06);

                    } else if (i == 5) {

                        ctx.arrow(0.39 * w, 0.59 * w,
                            0.29 * w, 0.69 * w,
                            w * 0.02, w * 0.06, h * 0.06);

                    }

                    ctx.fill();
                    ctx.stroke();
                }
            } else if (mode === "escapement_parts" || mode === "escapement_action") {
                let mvp = mat4_mul(vp, scale_mat4(3.4));
                mvp = mat4_mul(mvp, translation_mat4([-lerp(-2.072, -4.305, 0.5),
                -lerp(-3.03, -1.325, 0.5), -0.6]));
                gl.begin(width, height);

                let escape_angle = 0.02;
                let fork_angle = 0;

                if (mode === "escapement_action") {

                    if (!self.paused)
                        sim[0] += dt * arg0 * arg0;

                    let params = balance_params(sim[0]);

                    escape_angle = params[0];
                    fork_angle = params[1];

                    gl.draw_mesh("Arrow_curve", mat4_mul(mat4_mul(mat4_mul(mvp, translation_mat4([-2.072, -3.03, 0.6])), scale_mat4([0.25, 0.25, 0.3])), mat4_mul(rot_z_mat4(-pi * 0.5), rot_y_mat4(pi))), mat3_mul(rot, mat3_mul(rot_z_mat3(-pi * 0.5), rot_y_mat3(pi))), red_color)
                }


                draw_escape_wheel(mvp, rot, escape_angle, cyan_color);
                draw_pallet_fork(mvp, rot, fork_angle, blue_color);

                draw_pallet_fork_jewels(mvp, rot, fork_angle, true);

                ctx.drawImage(gl.finish(), 0, 0, width, height);

            } else if (mode === "main_plate") {
                gl.begin(width, height);
                draw_complete_assembly(vp, rot, 0, { "Mainplate": gray_color });
                ctx.drawImage(gl.finish(), 0, 0, width, height);
            } else if (mode === "main_plate_gears") {
                gl.begin(width, height);

                draw_complete_assembly(mat4_mul(vp, scale_mat4(0.95)), rot, 10, train_colors, {
                    "Second": -4 * smooth_step(0.25, 0.0, arg0),
                    "First": -6 * smooth_step(0.5, 0.25, arg0),
                    "Third": -8 * smooth_step(0.75, 0.5, arg0),
                    "Fourth": -10 * smooth_step(1.0, 0.75, arg0),
                })

                ctx.drawImage(gl.finish(), 0, 0, width, height);
            } else if (mode === "main_plate_gears2") {
                gl.begin(width, height);

                draw_complete_assembly(mat4_mul(vp, translation_mat4([0, 0, 2 * smooth_step(0.5, 0, arg0)])), rot, 13, {
                    "First": red_color,
                    "Second": orange_color,
                    "Third": yellow_color,
                    "Fourth": green_color,
                    "Escape": cyan_color,
                    "Pallet_fork": blue_color,
                    "Barrel_arbor": yellow_color,
                    "Train_bridge": bridge_color,
                    "Train_bridge_screw": dark_gray_color,

                }, {
                    "Train_bridge": -6.5 * smooth_step(0.5, 0, arg0),
                    "Train_bridge_screw": - 10 * smooth_step(1, 0.0, arg0),
                    "Train_bridge_screw_a": 15 * smooth_step(1, 0.85, arg0),
                })

                ctx.drawImage(gl.finish(), 0, 0, width, height);
            } else if (mode === "balance_assembly_assembly") {
                let mvp = vp;
                mvp = mat4_mul(mvp, scale_mat4(smooth_step(0.5, 0.8, arg0) * 0.25 + 0.75));

                gl.begin(width, height);
                let tt0 = smooth_step(1 / 3, 0, arg0);
                let tt1 = smooth_step(2 / 3, 1 / 3, arg0);

                draw_complete_assembly(mvp, rot, 16, {
                    "First": red_color,
                    "Barrel_arbor": yellow_color,
                    "Second": orange_color,
                    "Third": yellow_color,
                    "Fourth": green_color,
                    "Escape": cyan_color,
                    "Pallet_fork": blue_color,
                    "Balance_wheel": violet_color,
                    "Balance_bridge": gray_color,
                    "Balance_screw": dark_gray_color,
                }, {
                    "Balance_assembly_x": tt0 * -5,
                    "Balance_assembly_y": tt0 * -2,
                    "Balance_assembly_z": tt1 * -4,
                    "Balance_assembly_rot": -tt1 * 0.2,
                    "Hairspring_z": tt1 * 4,
                    "Hairspring_hang": -tt1 * 4 * 3,
                    "Balance_wheel": tt1 * 4,
                    "Balance_screw": smooth_step(3 / 3, 2 / 3, arg0) * -9,
                    "Balance_screw_a": smooth_step(3 / 3, 0.9, arg0) * 20,
                })

                ctx.drawImage(gl.finish(), 0, 0, width, height);
            } else if (mode === "mainspring_s" || mode === "mainspring_s2") {


                let spring_c = 0.1;
                if (sim_slider.dragged) {
                    sim[0] = arg0 - spring_c;
                    sim[1] = 0;

                    self.set_paused(false);
                } else if (Math.abs(sim[1]) > 0.001 || Math.abs(sim[0]) > 0.001) {

                    sim[1] += -100 * sim[0] * dt - sim[1] * 15 * dt;
                    sim[0] += sim[1] * dt;
                    arg0 = sim[0] + spring_c;


                    sim_slider.set_value(sim[0] + spring_c);
                } else {
                    self.set_paused(true);
                }

                let t = sim[0] / 0.9;
                let tt = (1 - t) * t + t * (3 * (1 - t) * (1 - t) * t + 3 * (1 - t) * t * t + t * t * t);

                let vals = mainspring_values_s(tt);

                let center = [0, 0];
                let range = 0;
                vals.forEach(f => {
                    range = Math.max(range, vec_len_sq(f))
                    center = vec_add(center, f);
                });

                range = Math.sqrt(range);

                let r0 = smooth_lerp(13, 5, sim[0]);

                gl.update_mainspring_buffer(vals, 0.06);

                {
                    let end_vals = new Array(mainspring_end_n + 1);

                    let k = mainspring_n - mainspring_end_n - 10;
                    let norm = vec_norm(vec_sub(vals[k + 1], vals[k - 1]));

                    let step = 0.3894736842105263 * 1024 / mainspring_n;

                    let p = vals[k];
                    p[0] -= norm[1] * 0.12;
                    p[1] += norm[0] * 0.12;

                    let f = sharp_step(0.8, 1, tt) * 1.5 - sharp_step(0.94, 1, tt) * 0.5;

                    let pp = p;
                    end_vals[0] = pp;
                    let fi = Math.atan2(norm[0], norm[1]);


                    for (let i = 0; i <= mainspring_end_n; i++) {
                        let tt = i / mainspring_end_n;
                        pp = [pp[0] + step * Math.sin(fi),
                        pp[1] + step * Math.cos(fi)];
                        end_vals[i] = pp;

                        fi -= f * (0.0431 - 0.0075 * Math.pow(tt, 0.4));
                    }

                    gl.update_mainspring_buffer(end_vals, 0.06, true);
                }


                let a = -Math.atan2(center[1], center[0]);

                let sc = 0.2;
                sc += smooth_step(0.2, 0.4, sim[0]) * 0.1;
                sc += smooth_step(0.55, 0.6, sim[0]) * 0.1;
                sc += Math.pow(smooth_step(0.5, 0.9, sim[0]), 1.7) * 1.7;

                let tr = (range - r0) * 0.5;
                let mvp = mat4_mul(vp, scale_mat4(sc));
                mvp = mat4_mul(mvp, translation_mat4([-tr * 0.1, -tr, 0.4]));
                mvp = mat4_mul(mvp, rot_z_mat4(a));

                let r = mat3_mul(rot, rot_z_mat3(a));

                gl.begin(width, height);

                gl.draw_mainspring(mat4_mul(mvp, mat4_mul(mat4_mul(translation_mat4([0, 0, -0.92]), scale_mat4([1, 1, 0.5])), rot_z_mat4(base_spring_angle))),
                    mat3_mul(r, rot_z_mat3(base_spring_angle)),
                    gray_color);

                gl.draw_mainspring(mat4_mul(mvp, mat4_mul(mat4_mul(translation_mat4([0, 0, -0.92]), scale_mat4([1, 1, 0.5])), rot_z_mat4(base_spring_angle))),
                    mat3_mul(r, rot_z_mat3(base_spring_angle)),
                    blue_color, true);

                gl.draw_mesh("Mainspring_base", mat4_mul(mvp, translation_mat4([0, 0, 18.85])), r, gray_color);

                ctx.drawImage(gl.finish(), 0, 0, width, height);

            } else if (mode === "mainspring_barrel") {

                let tt = (1 - smooth_step(0, 0.9, arg0)) * 5;
                let w = 1 - Math.pow(smooth_step(0.91, 0.99, arg0), 2);
                let values = mainspring_values(w, -w * 42.86);

                gl.update_mainspring_buffer(values, 0.06);
                gl.update_mainspring_buffer(mainspring_end_values(values), 0.06, true);



                let mvp = mat4_mul(vp, mat4_mul(scale_mat4(2), translation_mat4([0, 0, 0.4])));

                let r = rot;

                gl.begin(width, height);

                gl.draw_mesh("Barrel_main", mat4_mul(mvp, translation_mat4([0, 0, 25 + tt / 2])), r, red_color);
                gl.draw_gear_teeth_mesh("w11", mat4_mul(mvp, translation_mat4([0, 0, -0.45 + tt / 2])), r, red_color);

                let ra = -w * (42.86);
                mvp = mat4_mul(mvp, rot_z_mat4(ra));
                r = mat3_mul(r, rot_z_mat3(ra));


                gl.draw_mainspring(mat4_mul(mvp, mat4_mul(mat4_mul(translation_mat4([0, 0, -0.92 - tt / 2]), scale_mat4([1, 1, 0.5])), rot_z_mat4(base_spring_angle))),
                    mat3_mul(r, rot_z_mat3(base_spring_angle)),
                    blue_color, true);


                gl.draw_mainspring(mat4_mul(mvp, mat4_mul(mat4_mul(translation_mat4([0, 0, -0.92 - tt / 2]), scale_mat4([1, 1, 0.5])), rot_z_mat4(base_spring_angle))),
                    mat3_mul(r, rot_z_mat3(base_spring_angle)),
                    gray_color);


                gl.draw_mesh("Mainspring_base", mat4_mul(mvp, translation_mat4([0, 0, 18.85 - tt / 2])), r, gray_color);


                ctx.drawImage(gl.finish(), 0, 0, width, height);

            } else if (mode === "mainspring_arbor") {
                let values = mainspring_values(0, 0);
                gl.update_mainspring_buffer(values, 0.06);
                gl.update_mainspring_buffer(mainspring_end_values(values), 0.06, true);

                let mvp = mat4_mul(vp, mat4_mul(scale_mat4(2), translation_mat4([0, 0, 0.4])));

                let r = rot;

                gl.begin(width, height);

                gl.draw_mesh("Barrel_main", mat4_mul(mvp, translation_mat4([0, 0, 25])), r, red_color);
                gl.draw_gear_teeth_mesh("w11", mat4_mul(mvp, translation_mat4([0, 0, -0.45])), r, red_color);

                gl.draw_mainspring(mat4_mul(mvp, mat4_mul(mat4_mul(translation_mat4([0, 0, -0.92]), scale_mat4([1, 1, 0.5])), rot_z_mat4(base_spring_angle))),
                    mat3_mul(r, rot_z_mat3(base_spring_angle)),
                    gray_color);

                gl.draw_mainspring(mat4_mul(mvp, mat4_mul(mat4_mul(translation_mat4([0, 0, -0.92]), scale_mat4([1, 1, 0.5])), rot_z_mat4(base_spring_angle))),
                    mat3_mul(r, rot_z_mat3(base_spring_angle)),
                    blue_color, true);


                let aa = smooth_step(1.0, 0.7, arg0) * 1.1;
                gl.draw_mesh("Barrel_arbor", mat4_mul(mat4_mul(mvp, rot_z_mat4(aa)), translation_mat4([0, 0, 18.85 - 4.5 * smooth_step(0.7, 0.3, arg0)])), mat3_mul(r, rot_z_mat3(aa)), yellow_color);


                let tt = smooth_step(0.0, 0.3, arg0) - smooth_step(0.7, 1, arg0);
                let flex = 1 - tt * 0.18;
                let rr = -tt * 0.022 * tt;
                gl.draw_mesh("Mainspring_base", mat4_mul(mvp, translation_mat4([0, 0, 18.85])), r, gray_color, 1, "mainspring_base", [flex, rr, 2, 1]);


                ctx.drawImage(gl.finish(), 0, 0, width, height);

            } else if (mode === "mainspring_arbor_hook") {

                let mvp = mat4_mul(vp, mat4_mul(scale_mat4(8), translation_mat4([0, 0, 0.8])));

                let r = rot;

                gl.begin(width, height);

                gl.set_line_offset(-0.002);



                let aa = smooth_lerp(0.1, -0.1, arg0)
                gl.draw_mesh("Barrel_arbor", mat4_mul(mat4_mul(mvp, rot_z_mat4(aa)), translation_mat4([0, 0, 18.85])), mat3_mul(r, rot_z_mat3(aa)), yellow_color);


                aa = Math.min(0, aa);
                mvp = mat4_mul(mvp, rot_z_mat4(aa));
                gl.draw_mesh("Mainspring_base", mat4_mul(mvp, translation_mat4([0, 0, 18.85])), r, gray_color);
                gl.draw_mesh("Mainspring_cut", mat4_mul(mvp, translation_mat4([0, 0, 18.85])), r, gray_color);


                ctx.drawImage(gl.finish(), 0, 0, width, height);

            } else if (mode === "mainspring_lid" || mode === "mainspring_friction") {

                let w = mode === "mainspring_friction" ? 1 : 0;
                let values = mainspring_values(w, -w * 42.86);
                gl.update_mainspring_buffer(values, 0.06);
                gl.update_mainspring_buffer(mainspring_end_values(values), 0.06, true);

                let mvp = mat4_mul(vp, mat4_mul(scale_mat4(1.95), translation_mat4([0, 0, 0.6 + 2.5 * smooth_step(0.95, 0.0, arg0)])))
                let r = rot;

                let off = 5.0 - 4.8 * smooth_step(0, 0.95, arg0) - sharp_step(0.97, 0.99, arg0) * 0.2;

                gl.begin(width, height);

                if (mode === "mainspring_lid") {
                    gl.draw_mesh("Barrel_lid", mat4_mul(mvp, translation_mat4([0, 0, 25 - off])), r, red_color);
                } else {
                    mvp = mat4_mul(mvp, translation_mat4([0, 0, -2.5]));
                    let n = 20;
                    let color = vec_lerp(blue_color, [0.5, 0.5, 0.5, 1], 0.5);
                    for (let i = 0; i <= n; i++) {
                        let a = 2.2 + i / n * 4.6;

                        let m = mat4_mul(rot_z_mat4(a), mat4_mul(translation_mat4([0, 10.2 + smooth_step(2.2, 3, a) * 0.2, -1]), scale_mat4(0.3)));

                        gl.draw_mesh("Arrow", mat4_mul(vp, m), mat3_mul(rot, rot_z_mat3(a)), color);
                    }
                }

                gl.draw_mesh("Barrel_main", mat4_mul(mvp, translation_mat4([0, 0, 25])), r, red_color);
                gl.draw_gear_teeth_mesh("w11", mat4_mul(mvp, translation_mat4([0, 0, -0.45])), r, red_color);

                gl.draw_mainspring(mat4_mul(mvp, mat4_mul(mat4_mul(translation_mat4([0, 0, -0.92]), scale_mat4([1, 1, 0.5])), rot_z_mat4(base_spring_angle))),
                    mat3_mul(r, rot_z_mat3(base_spring_angle)),
                    gray_color);

                gl.draw_mainspring(mat4_mul(mvp, mat4_mul(mat4_mul(translation_mat4([0, 0, -0.92]), scale_mat4([1, 1, 0.5])), rot_z_mat4(base_spring_angle))),
                    mat3_mul(r, rot_z_mat3(base_spring_angle)),
                    blue_color, true);


                let ra = -sim[0] * (42.86);
                gl.draw_mesh("Barrel_arbor", mat4_mul(mat4_mul(mvp, rot_z_mat4(ra)), translation_mat4([0, 0, 18.85])), mat3_mul(r, rot_z_mat3(ra)), yellow_color);


                let flex = 1
                let rr = 0
                gl.draw_mesh("Mainspring_base", mat4_mul(mvp, translation_mat4([0, 0, 18.85])), r, gray_color, 1, "mainspring_base", [flex, rr, 2, 1]);


                ctx.drawImage(gl.finish(), 0, 0, width, height);

            } else if (mode === "mainspring_wind0" || mode === "mainspring_wind1" || mode === "mainspring_wind2") {

                if (sim_slider.dragged) {

                    sim[4] += arg0 - sim[0];

                    sim[0] = arg0;
                    sim[1] = 0;

                    self.set_paused(false);
                } else if (sim[0] != 0) {

                    sim[1] += -8 * dt;
                    sim[0] += sim[1] * dt;

                    sim[0] = Math.max(0, sim[0]);
                    sim_slider.set_value(sim[0]);

                    sim[3] = -sim[4] + sim[0];

                    arg0 = sim[0];

                } else {
                    self.set_paused(true);
                }



                let ra = -sim[0] * (42.86);


                let values = mainspring_values(sim[0], ra);
                gl.update_mainspring_buffer(values, 0.06);
                gl.update_mainspring_buffer(mainspring_end_values(values), 0.06, true);


                let mvp = mat4_mul(vp, scale_mat4(mode === "mainspring_wind2" ? 1.4 : 1.8));
                let r = rot;

                gl.begin(width, height);

                if (mode === "mainspring_wind1" || mode === "mainspring_wind2") {
                    mvp = mat4_mul(mvp, rot_z_mat4((sim[3]) * (42.86)));
                    r = mat3_mul(r, rot_z_mat3((sim[3]) * (42.86)));
                }

                gl.draw_mesh("Barrel_main", mat4_mul(mvp, translation_mat4([0, 0, 25])), r, red_color);
                gl.draw_gear_teeth_mesh("w11", mat4_mul(mvp, translation_mat4([0, 0, -0.45])), r, red_color);

                if (mode === "mainspring_wind2") {
                    gl.draw_mesh("Barrel_lid", mat4_mul(mvp, translation_mat4([0, 0, 25])), r, red_color);


                    gl.draw_mesh("Minute_hand", mat4_mul(mvp, translation_mat4([0, 0, 122.6])), r, hand_color);

                    {

                        let m = mvp;
                        m = mat4_mul(m, translation_mat4([0, 1.4, 0.1]));
                        m = mat4_mul(m, scale_mat4([1, 0.2, 1.0]));

                        gl.draw_mesh("Cube", m, r, red_color);

                        m = mvp;
                        m = mat4_mul(m, translation_mat4([0, 0.5, 1.1]));
                        m = mat4_mul(m, scale_mat4([1, 2, 0.2]));

                        gl.draw_mesh("Cube", m, r, red_color);

                        m = mvp;
                        m = mat4_mul(m, translation_mat4([0, 0.0, 1.7]));
                        m = mat4_mul(m, scale_mat4([0.45, 0.45, 0.4]));

                        gl.draw_mesh("Cylinder", m, r, red_color);
                    }
                }

                mvp = mat4_mul(mvp, rot_z_mat4(ra));
                r = mat3_mul(r, rot_z_mat3(ra));

                gl.draw_mainspring(mat4_mul(mvp, mat4_mul(mat4_mul(translation_mat4([0, 0, -0.92]), scale_mat4([1, 1, 0.5])), rot_z_mat4(base_spring_angle))),
                    mat3_mul(r, rot_z_mat3(base_spring_angle)),
                    gray_color);

                gl.draw_mainspring(mat4_mul(mvp, mat4_mul(mat4_mul(translation_mat4([0, 0, -0.92]), scale_mat4([1, 1, 0.5])), rot_z_mat4(base_spring_angle))),
                    mat3_mul(r, rot_z_mat3(base_spring_angle)),
                    blue_color, true);


                gl.draw_mesh("Barrel_arbor", mat4_mul(mvp, translation_mat4([0, 0, 18.85])), r, yellow_color);

                gl.draw_mesh("Mainspring_base", mat4_mul(mvp, translation_mat4([0, 0, 18.85])), r, gray_color);


                if (mode === "mainspring_wind0" || mode === "mainspring_wind1") {
                    ctx.drawImage(gl.finish(), 0, - font_size * 2, width, height);

                    let a0 = mode === "mainspring_wind0" || sim_slider.dragged ? 1 : 0.3;
                    let a1 = mode === "mainspring_wind1" || sim_slider.dragged ? 1 : 0.3;

                    ctx.translate(width * 0.5, height - font_size * 2.5);

                    ctx.globalAlpha = a0;
                    ctx.fillStyle = "#cf4f4a";
                    ctx.fillText("barrel held", 0, 0);

                    ctx.fillStyle = "#C9A33A";
                    ctx.globalAlpha = a1;
                    ctx.fillText("arbor held", 0, font_size * 1.5);

                } else {
                    ctx.drawImage(gl.finish(), 0, 0, width, height);
                }

            } else if (mode === "balance_wheel") {

                let mvp = mat4_mul(vp, scale_mat4(2.5));
                let center = 0.5;
                if (sim_slider.dragged) {
                    sim[0] = arg0 - center;
                    sim[1] = 0;

                    self.set_paused(false);
                } else if (Math.abs(sim[1]) > 0.001 || Math.abs(sim[0]) > 0.001) {

                    sim[1] += -631.6546816697 * sim[0] * dt - sim[1] * 0.42 * dt;
                    sim[0] += sim[1] * dt;
                    arg0 = sim[0] + center;

                    sim_slider.set_value(sim[0] + center);
                } else {
                    self.set_paused(true);
                    sim_slider.set_value(sim[0] + center);
                }

                let angle = sim[0] * 2.26 * 2;
                gl.begin(width, height);


                draw_balance_wheel(mat4_mul(mvp, translation_mat4([6.54, -0.3751, 0])), rot, angle, violet_color);
                draw_hairspring(mat4_mul(mvp, translation_mat4([6.54, -0.3751, 0])), rot, angle, 0);

                draw_balance_wheel_jewel(mat4_mul(mvp, translation_mat4([6.54, -0.3751, 0])), rot, angle, true);


                ctx.drawImage(gl.finish(), 0, 0, width, height);

            } else if (mode === "coil_spring") {
                let mvp = mat4_mul(vp, mat4_mul(scale_mat4(4.2), translation_mat4([0, 0, -1.75])));
                let center = 0.5;

                let h = 3;

                let range = 2.3;

                if (sim_slider.dragged) {
                    sim[0] = arg0 - center;
                    sim[1] = 0;

                    self.set_paused(false);
                } else if (Math.abs(sim[1]) > 0.001 || Math.abs(sim[0]) > 0.001) {

                    sim[1] += -100 * sim[0] * dt - sim[1] * 2 * dt;
                    sim[0] += sim[1] * dt;


                    arg0 = sim[0] + center;

                    sim_slider.set_value(sim[0] + center);
                } else {
                    sim_slider.set_value(sim[0] + center);

                    self.set_paused(true);
                }

                let offset = sim[0] * range;

                gl.begin(width, height);

                gl.draw_coil_spring(0.6, 0.1, h + offset, mvp, rot, yellow_color)

                {

                    let m = mvp;
                    m = mat4_mul(m, translation_mat4([0, 0, -0.05]));
                    m = mat4_mul(m, scale_mat4([3, 3, 0.05]));

                    gl.draw_mesh("Cube", m, rot, gray_color);
                }

                {

                    let m = mvp;
                    m = mat4_mul(m, translation_mat4([0, 0, h + offset]));
                    m = mat4_mul(m, scale_mat4([2, 2, 0.5]));

                    gl.draw_mesh("Cube", m, rot, red_color);
                }

                ctx.drawImage(gl.finish(), 0, 0, width, height);
            } else if (mode === "torsion_spring" || mode === "torsion_spring2" || mode === "torsion_spring3") {
                let mvp = mat4_mul(vp, mat4_mul(scale_mat4(5), translation_mat4([0, 0, 0.9])));
                let center = 0.5;


                let angle_range = 8;
                let h_scale = 0.007
                if (mode === "torsion_spring") {
                    arg1 = 3;
                    arg2 = 1;
                    angle_range = 10;
                    h_scale = 0.004
                }

                let len = 2 + arg2 * 6;
                let stiff = (1 + arg1 * 30) * 10 * (1.11 * 1.11);
                let mass = len * len * 0.2;

                let h = h_scale * Math.cbrt(stiff);

                let b = 0.4;

                if (sim_slider.dragged) {
                    sim[0] = arg0 - center;
                    sim[1] = 0;

                    self.set_paused(false);
                } else if (Math.abs(sim[1]) > 0.001 || Math.abs(sim[0]) > 0.001) {

                    sim[1] += -stiff / mass * sim[0] * dt - sim[1] * 0.5 * dt;
                    sim[0] += sim[1] * dt;

                    if (sim[0] > 0.5) {
                        sim[0] = 0.5;
                        sim[1] = 0;
                    } else if (sim[0] < -0.5) {
                        sim[0] = -0.5;
                        sim[1] = 0;
                    }
                    arg0 = sim[0] + center;



                    sim_slider.set_value(sim[0] + center);
                } else {
                    sim_slider.set_value(sim[0] + center);

                    self.set_paused(true);
                }

                let angle = sim[0] * angle_range;

                gl.begin(width, height);



                let l = 80;
                let a = 12.9 * pi * 2;

                if (mode === "torsion_spring") {
                    l = 40;
                    a = 6 * pi * 2;
                }

                a += angle;

                let RR = 2 * l / (a * Math.sqrt(1 + a * a) + Math.log(a + Math.sqrt(1 + a * a)));


                let m = mvp;
                m = mat4_mul(m, scale_mat4([1, 1, 0.5 * b]));
                m = mat4_mul(m, rot_z_mat4(angle));

                let r = rot;

                r = mat3_mul(r, rot_z_mat3(angle));

                gl.draw_spring(m, r, yellow_color, "hairspring", [a, 0.15 + h, RR, h, 0, 0,
                    a - pi, a, 2.4]);

                {

                    m = mvp;
                    m = mat4_mul(m, rot_z_mat4(-a + angle));
                    m = mat4_mul(m, translation_mat4([0, 2.4, -b * 0.5]));
                    m = mat4_mul(m, scale_mat4(vec_scale([0.002, h * 4, b * 2], 0.5)));

                    gl.draw_mesh("Cube", m, mat3_mul(rot, rot_z_mat3(-a + angle)), yellow_color);
                }

                m = mvp;
                m = mat4_mul(m, translation_mat4([0, 0, -2 - 0.5]));
                m = mat4_mul(m, rot_z_mat4(angle));
                m = mat4_mul(m, scale_mat4(vec_scale([len, 1, 1], 0.5)));

                gl.draw_mesh("Cube", m, r, blue_color);

                m = mvp;
                m = mat4_mul(m, translation_mat4([0, 0, b]));
                m = mat4_mul(m, scale_mat4([0.15, 0.15, 2 + b]));

                gl.draw_mesh("Cylinder", m, rot, red_color);

                m = mvp;
                m = mat4_mul(m, rot_z_mat4(angle));
                m = mat4_mul(m, translation_mat4([0, 0.2, -b]));
                m = mat4_mul(m, scale_mat4([0.1, 0.1, 2 * b]));

                gl.draw_mesh("Cube", m, rot, red_color);


                if (mode === "torsion_spring3") {
                    let T = 2 * pi / Math.sqrt(stiff / mass);
                    ctx.drawImage(gl.finish(), 0, -font_size, width, height);
                    let tt = Math.round(T * 100.0) * 0.01;
                    ctx.fillText("period = " + tt.toFixed(2) + " second" + (tt != 1 ? "s" : ""), width * 0.5, height - font_size * 0.5);

                } else {
                    ctx.drawImage(gl.finish(), 0, 0, width, height);
                }

            } else if (mode === "jewel") {
                let m = mat4_mul(scale_mat4(2), translation_mat4([0, 0, -3]));
                gl.begin(width, height);

                for (let i = 0; i < 4; i++)
                    gl.draw_mesh("Jewel_pretty", mat4_mul(vp, mat4_mul(mat4_mul(scale_mat4(6.5), rot_z_mat4(i * pi * 0.5)), translation_mat4([0, 0, -24.5]))), mat3_mul(rot, rot_z_mat3(i * pi * 0.5)), jewel_color, 1, "jewel_pretty", [1, 1, 1, 1]);
                ctx.drawImage(gl.finish(), 0, 0, width, height);
            } else if (mode === "pallet_fork_assembly") {

                gl.begin(width, height);

                draw_complete_assembly(vp, rot, 3, {
                    "Escape": cyan_color,
                    "Pallet_fork": blue_color,
                }, {
                    "Escape": -6 * smooth_step(0.5, 0, arg0),
                    "Pallet_fork": -8 * smooth_step(1, 0.5, arg0),
                });

                ctx.drawImage(gl.finish(), 0, 0, width, height);

            } else if (mode === "pallet_fork_bridge_assembly") {

                gl.begin(width, height);

                draw_complete_assembly(mat4_mul(vp, translation_mat4([0, 0, 0 * smooth_step(0.5, 0, arg0)])), rot, 5, {
                    "Escape": cyan_color,
                    "Pallet_fork": blue_color,
                    "Pallet_bridge": bridge_color,
                    "Pallet_bridge_screw": dark_gray_color,
                }, {
                    "Pallet_bridge": -8 * smooth_step(0.5, 0, arg0),
                    "Pallet_bridge_screw": - 11 * smooth_step(1, 0.5, arg0),
                    "Pallet_bridge_screw_a": 15 * smooth_step(1, 0.9, arg0),
                });

                ctx.drawImage(gl.finish(), 0, 0, width, height);

            } else if (mode === "pallet_fork_limits") {

                gl.begin(width, height);
                gl.set_line_offset(-0.00002);

                let mvp = mat4_mul(vp, scale_mat4(5));
                mvp = mat4_mul(mvp, translation_mat4([4.305, 1.325, 0]));

                mvp = mat4_mul(scale_mat4([1, 1, 0.04]), mvp);


                let min = 0.15;
                min += sharp_step(0.56, 0.5, arg0) * 0.005;
                min += sharp_step(0.39, 0.0, arg0) * 0.05;

                let max = 0.205;
                max -= sharp_step(0.45, 0.85, arg0) * 0.06;


                sim[0] = clamp(sim[0], min, max);

                draw_complete_assembly(mvp, rot, 5, {
                    "Escape": cyan_color,
                    "Pallet_fork": blue_color,
                    "Pallet_bridge": bridge_color,
                    "Pallet_bridge_screw": dark_gray_color,

                }, undefined, {
                    "fork_angle": (arg0 - 0.5) * 0.128 * 2,
                    "escape": sim[0]
                });



                ctx.drawImage(gl.finish(), 0, 0, width, height);

                ctx.feather(width * scale, height * scale,
                    canvas.height * 0.1, canvas.height * 0.1,
                    canvas.height * 0.1, canvas.height * 0.1);

            } else if (mode === "balance_assembly" || mode === "balance_assembly2" || mode === "balance_assembly3") {

                let assembly0 = mode === "balance_assembly" ? arg0 : 1;

                let stud_angle = 0;
                let index_angle = 0;

                if (mode === "balance_assembly2") {
                    stud_angle = -(arg0 - 0.5) * 0.3;
                    index_angle = -(arg1 - 0.5) * 0.3;
                }


                let sc = 1.35;

                if (mode === "balance_assembly3")
                    sc = 3.9;
                else if (mode === "balance_assembly2")
                    sc = 2.3;
                else if (mode === "balance_assembly")
                    sc = 1.2 + smooth_step(0.8, 1.0, arg0) * 0.15;


                let mvp = mat4_mul(vp, scale_mat4(sc));
                if (mode === "balance_assembly3")
                    mvp = mat4_mul(scale_mat4([1, 1, 0.4]), mat4_mul(mvp, translation_mat4([0, 0, 3])));
                else if (mode === "balance_assembly2")
                    mvp = mat4_mul(mvp, translation_mat4([0, 0, 1]));
                else
                    mvp = mat4_mul(mvp, translation_mat4([0, -3, 1]));

                gl.begin(width, height);

                let balance_mvp = mat4_mul(mvp, rot_z_mat4(stud_angle));
                balance_mvp = mat4_mul(balance_mvp, translation_mat4([6.54, -0.3751, -1]));
                mvp = mat4_mul(mvp, translation_mat4([6.54, -0.3751, -1]));



                let zz = smooth_step(5 / 5, 4 / 5, assembly0) * 2.5;
                draw_balance_wheel(mat4_mul(balance_mvp, translation_mat4([0, 0, zz])), rot, 0, violet_color);
                draw_hairspring(mat4_mul(balance_mvp, translation_mat4([0, 0, zz * 1.2])), rot, 0, -zz * 3, gray_color);


                {
                    let m = mvp;
                    let tt0 = smooth_step(4 / 5, 3 / 5, assembly0);
                    let tt1 = smooth_step(5 / 5, 4 / 5, assembly0);

                    m = mat4_mul(m, translation_mat4([tt0 * - 7, tt0 * -2, tt1 * 0.6]));



                    if (mode === "balance_assembly") {
                        gl.draw_mesh("Shock_base", mat4_mul(m, translation_mat4([-6.54, 0.3751, -10.5])), rot, bridge_color);

                        draw_balance_bridge(mat4_mul(m, translation_mat4([0, 0, 0])), rot, bridge_color);


                        draw_screw(m, rot, bridge_color, true, [-6.4183, 4.8659, -0.85], 0, 0.25, 0.6, 0.4);
                    } else {

                        gl.draw_mesh("Shock_base", mat4_mul(m, translation_mat4([-6.54, 0.3751, -10.5])), rot);
                        draw_balance_bridge(mat4_mul(m, translation_mat4([0, 0, 0])), rot);


                        draw_screw(m, rot, mode === "balance_assembly2" ? gray_color : neutral_color, true, [-6.4183, 4.8659, -0.85], 0, 0.25, 0.6, 0.4);
                    }

                }

                let colors = {
                    "Stud": yellow_color,
                    "Stud_base": yellow_color,
                    "Index_stud": cyan_color,
                    "Lower_index": cyan_color,
                    "Upper_index": cyan_color,
                }

                if (mode === "balance_assembly3") {
                    colors = {}
                }

                draw_regulator(mvp, rot, colors, {
                    "Stud_base": smooth_step(1 / 5, 0, assembly0) * -6,
                    "Upper_index": smooth_step(2 / 5, 1 / 5, assembly0) * -3,
                    "Lower_index": smooth_step(3 / 5, 2 / 5, assembly0) * 6,
                    "Stud_base_angle": stud_angle,
                    "Index_angle": index_angle,
                });



                if (mode === "balance_assembly3") {

                    let rt = 1 - smooth_step(0.95, 0.7, arg0);
                    let tt = 1 - smooth_step(0.95, 4 / 6, arg0);
                    let ht = smooth_step(0.90, 1.0, arg0);
                    let ww = 1;
                    let s0 = lerp(2 * pi, -ww * 1.5, tt);
                    let s1 = lerp(2 * pi + ww * 0.5, 0, tt);

                    let m = mat4_mul(mvp, translation_mat4([-6.54, 0.3751, -10.5]));

                    gl.draw_mesh("Shock_center", mat4_mul(m, translation_mat4([0, 0, smooth_step(1 / 6, 0 / 6, arg0) * -0.8])), rot, yellow_color);

                    let spring_a = rt * pi * (5 / 3) - 2 * pi / 3;
                    gl.draw_mesh("Shock_spring", mat4_mul(mat4_mul(m, rot_z_mat4(spring_a)), translation_mat4([0, 0, smooth_step(4 / 6, 3 / 6, arg0) * -4 * 0.8 - 0.12 + 0.06 * ht])), mat3_mul(rot, rot_z_mat3(spring_a)), cyan_color, 1, "shock_spring", [s0, s1, 0.24 - 0.12 * ht, 0]);


                    draw_jewel(mat4_mul(m, translation_mat4([0, 0, smooth_step(2 / 6, 1 / 6, arg0) * -2 * 0.8 + 9.55])), rot, 0.8, 0.14, 0.2, undefined, true);
                    gl.draw_mesh("Shock_jewel", mat4_mul(m, translation_mat4([0, 0, smooth_step(3 / 6, 2 / 6, arg0) * -3 * 0.8])), rot, jewel_color, 1, "jewel", [1, 1, 1, 1]);
                }

                draw_balance_wheel_jewel(mat4_mul(balance_mvp, translation_mat4([0, 0, zz])), rot, 0, true);

                ctx.drawImage(gl.finish(), 0, 0, width, height);

                if (mode === "balance_assembly3" || mode === "balance_assembly2") {
                    ctx.feather(width * scale, height * scale,
                        canvas.height * 0.1, canvas.height * 0.1,
                        canvas.height * 0.1, canvas.height * 0.1);
                }

            } else if (mode === "shock_protector") {


                if (sim_slider.dragged) {

                    sim[0] = arg0;
                    sim[1] = 0;

                    self.set_paused(false);
                } else if (sim[0] != 0) {

                    sim[1] += -200 * dt;
                    sim[0] += sim[1] * dt;

                    sim[0] = Math.max(0, sim[0]);
                    sim_slider.set_value(sim[0]);

                    arg0 = sim[0];

                } else {
                    self.set_paused(true);
                }

                let dh = -0.05 * arg0;


                rot = rot_y_mat3(-pi * 0.5);

                let mvp = mat4_mul(ortho_proj, mat3_to_mat4(rot));
                mvp = mat4_mul(mvp, rot_x_mat4(pi * 0.5));
                mvp = mat4_mul(mvp, scale_mat4(15));

                let m = mat4_mul(mvp, translation_mat4([0, 0, -10]));

                gl.begin(width, height);


                let balance_mvp = mat4_mul(mvp, translation_mat4([6.54, -0.3751, 0.55 + dh]));

                draw_balance_wheel(balance_mvp, rot, 0, violet_color);


                gl.draw_mesh("Shock_base_cut", m, rot, gray_color);

                gl.draw_mesh("Shock_center_cut", mat4_mul(m, translation_mat4([0, 0, dh])), rot, yellow_color);


                let spring_a = pi * (5 / 3) - 2 * pi / 3;
                gl.draw_mesh("Shock_spring", mat4_mul(mat4_mul(m, rot_z_mat4(spring_a)), translation_mat4([0, 0, -0.12 + 0.09 + dh * 1.3])), mat3_mul(rot, rot_z_mat3(spring_a)), cyan_color, 1, "shock_spring", [-3, -2, 0.07 - dh * 2.2, 0]);


                draw_jewel(mat4_mul(m, translation_mat4([0, 0, 9.55 + dh])), rot, 0.8, 0.14, 0.2, undefined, true);
                gl.draw_mesh("Shock_jewel", mat4_mul(m, translation_mat4([0, 0, dh])), rot, jewel_color, 1, "jewel", [1, 1, 1, 1]);

                ctx.drawImage(gl.finish(), 0, 0, width, height);

                ctx.feather(width * scale, height * scale,
                    canvas.height * 0.1, canvas.height * 0.1,
                    canvas.height * 0.1, canvas.height * 0.1);

            } else if (mode === "arbor_spring_wind" || mode === "arbor_ratchet_wheel_turn") {

                if (sim_slider.dragged) {

                    sim[4] += arg0 - sim[0];

                    sim[0] = arg0;
                    sim[1] = 0;

                    self.set_paused(false);
                } else if (sim[0] != 0) {

                    sim[1] += -10 * dt;
                    sim[0] += sim[1] * dt;

                    sim[0] = Math.max(0, sim[0]);
                    sim_slider.set_value(sim[0]);

                    sim[3] = -sim[4] + sim[0];

                    arg0 = sim[0];

                } else {
                    self.set_paused(true);
                }

                if (sim[0] != 0) {
                    sim[2] += dt;
                    sim[5] = Math.min(1, sim[5] + 0.2 * dt);
                }
                else {
                    sim[2] = Math.ceil(sim[2] * 4) * 0.25;
                    sim[5] = 0;
                }



                let angle = sim[0] * (42.86) * 0.2;
                gl.begin(width, height);

                let values = mainspring_values(sim[0], -angle);
                gl.update_mainspring_buffer(values, 0.06);
                gl.update_mainspring_buffer(mainspring_end_values(values), 0.06, true);

                if (mode === "arbor_spring_wind") {
                    draw_complete_assembly(vp, rot, 16, train_colors, {
                        "Cut_barrel": true,
                        "Main_spring": angle,
                    }, {
                        "arbor": angle,
                        "balance_time": sim[2],
                        "balance_amp_scale": sim[5],
                        "show_second_hand": true,
                    });
                } else {
                    draw_complete_assembly(vp, rot, 23, {
                        "Barrel_arbor": yellow_color,
                        "Ratchet_wheel": green_color,
                    }, {
                        "Ratchet_wheel_screw": 1000,
                    }, {
                        "arbor": angle,
                        "balance_time": sim[2],
                        "balance_amp_scale": sim[5],
                        "show_second_hand": true,
                    });
                }

                ctx.drawImage(gl.finish(), 0, 0, width, height);

            } else if (mode === "arbor_barrel_bridge") {
                gl.begin(width, height);

                draw_complete_assembly(mat4_mul(vp, scale_mat4(0.9 + smooth_step(0.8, 1.0, arg0) * 0.1)), rot, 20, {
                    "Stop_lever": cyan_color,
                    "Barrel_bridge": bridge_color,
                    "Barrel_arbor": yellow_color,
                    "First": red_color,
                    "Barrel_bridge_screw": dark_gray_color,
                }, {
                    "Stop_lever": -4 * smooth_step(1 / 3, 0, arg0),
                    "Barrel_bridge": -7 * smooth_step(2 / 3, 1 / 3, arg0),
                    "Barrel_bridge_screw": -9 * smooth_step(1, 2 / 3, arg0),
                    "Barrel_bridge_screw_a": 10 * smooth_step(1, 0.95, arg0),
                });

                ctx.drawImage(gl.finish(), 0, 0, width, height);
            } else if (mode === "arbor_ratchet_wheel") {
                gl.begin(width, height);

                draw_complete_assembly(vp, rot, 23, {
                    "Barrel_arbor": yellow_color,
                    "Ratchet_wheel": green_color,
                    "Ratchet_wheel_screw": dark_gray_color,
                }, {
                    "Ratchet_wheel": -6 * smooth_step(0.5, 0, arg0),
                    "Ratchet_wheel_screw": -9 * smooth_step(1, 0.5, arg0),
                    "Ratchet_wheel_screw_a": 12 * smooth_step(1, 0.9, arg0),
                });

                ctx.drawImage(gl.finish(), 0, 0, width, height);
            } else if (mode === "click_assembly") {
                gl.begin(width, height);



                draw_complete_assembly(vp, rot, 30, {
                    "Click": blue_color,
                    "Ratchet_wheel": green_color,
                    "Barrel_arbor": yellow_color,

                    "Barrel_bridge": gray_color,
                }, {
                    "Click": -8 * smooth_step(1, 0, arg0),
                }, {
                    "click": 0.0
                });

                ctx.drawImage(gl.finish(), 0, 0, width, height);
            } else if (mode === "click_rotation") {
                gl.begin(width, height);

                gl.set_line_offset(-0.0001);

                let mvp = mat4_mul(vp, scale_mat4(3));
                mvp = mat4_mul(mvp, translation_mat4([2.628, -7.2, 0]));

                mvp = mat4_mul(scale_mat4([1, 1, 0.07]), mvp);

                draw_complete_assembly(mvp, rot, 30, {
                    "Click": blue_color,
                    "Barrel_arbor": yellow_color,
                    "Barrel_bridge": gray_color,
                    "Ratchet_wheel": green_color,

                }, undefined, { "click": lerp(-0.01, 0.44, arg0) });

                ctx.drawImage(gl.finish(), 0, 0, width, height);

                ctx.feather(width * scale, height * scale,
                    canvas.height * 0.1, canvas.height * 0.1,
                    canvas.height * 0.1, canvas.height * 0.1);
            } else if (mode === "click_spring_flex") {

                let center = 0.8;
                if (sim_slider.dragged) {
                    sim[0] = arg0 - center;
                    sim[1] = 0;

                    self.set_paused(false);
                } else if (Math.abs(sim[1]) > 0.01 || Math.abs(sim[0]) > 0.01) {

                    sim[1] += -20 * sim[0] - sim[1] * 0.6;
                    sim[0] += sim[1] * dt;

                    sim_slider.set_value(sim[0] + center);
                    arg0 = sim[0] + center;
                } else {
                    self.set_paused(true);
                }

                let flex = 0.07 + sim[0] * 0.15;

                gl.begin(width, height);

                let sc = 6;
                let mvp = mat4_mul(vp, mat4_mul(scale_mat4(sc), translation_mat4([0.8, 0, 15 + 0.125])));

                gl.draw_mesh("Click_spring", mvp, rot, red_color, 1, "click_spring", [flex, 0, 0, 0]);


                if (sim_slider.dragged) {
                    let s = -sim[0] * 2.5;
                    let t = - 8 * sim[0] + (sim[0] < 0 ? -8.8 : -7.4);
                    t *= sc / 10;

                    let as = Math.abs(s);
                    gl.draw_mesh("Arrow", mat4_mul(vp, mat4_mul(translation_mat4([-sc, t, s * 0.5 - 0.125]), mat4_mul(rot_z_mat4(s < 0 ? pi : 0), scale_mat4(as)))), mat3_mul(rot, rot_z_mat3(s < 0 ? pi : 0)), green_color);
                    gl.draw_mesh("Arrow", mat4_mul(vp, mat4_mul(translation_mat4([-sc, -t, s * 0.5 - 0.125]), mat4_mul(rot_z_mat4(s > 0 ? pi : 0), scale_mat4(as)))), mat3_mul(rot, rot_z_mat3(s > 0 ? pi : 0)), green_color);
                }




                ctx.drawImage(gl.finish(), 0, 0, width, height);
            } else if (mode === "click_spring_assembly") {
                gl.begin(width, height);

                draw_complete_assembly(vp, rot, 33, {
                    "Click": blue_color,
                    "Click_spring": red_color,
                    "Barrel_arbor": yellow_color,
                    "Barrel_bridge": gray_color,
                    "Ratchet_wheel": green_color,
                }, {
                    "Click_spring": -10 * smooth_step(1, 0.3, arg0),
                }, {
                    "click_spring": smooth_step(0.3, 0.0, arg0) * 0.07,
                    "click": 0,
                });

                ctx.drawImage(gl.finish(), 0, 0, width, height);
            } else if (mode === "click_rotation_spring") {


                let center = 0.0;
                if (sim_slider.dragged) {
                    sim[0] = arg0 - center;
                    sim[1] = 0;

                    self.set_paused(false);
                } else if (sim[0] > 0.01) {

                    sim[1] += -20 * sim[0] - sim[1] * 0.6;
                    sim[0] += sim[1] * dt;

                    sim[0] = Math.max(sim[0], 0);

                    sim_slider.set_value(sim[0] + center);
                    arg0 = sim[0] + center;
                } else {
                    sim[0] = 0;
                    self.set_paused(true);
                }


                gl.begin(width, height);

                gl.set_line_offset(-0.0001);

                let mvp = mat4_mul(vp, scale_mat4(3));
                mvp = mat4_mul(mvp, translation_mat4([2.628, -7.2, 0]));
                mvp = mat4_mul(scale_mat4([1, 1, 0.07]), mvp);

                draw_complete_assembly(mvp, rot, 33, {
                    "Click": blue_color,
                    "Click_spring": red_color,
                    "Barrel_arbor": yellow_color,
                    "Barrel_bridge": gray_color,
                    "Ratchet_wheel": green_color,
                }, undefined, { "click": lerp(-0.01, 0.44, arg0) });
                ;


                ctx.drawImage(gl.finish(), 0, 0, width, height);

                ctx.feather(width * scale, height * scale,
                    canvas.height * 0.1, canvas.height * 0.1,
                    canvas.height * 0.1, canvas.height * 0.1);

            } else if (mode === "crown_wheel_assembly") {
                gl.begin(width, height);

                draw_complete_assembly(vp, rot, 40, {
                    "Click": blue_color,

                    "Crown_wheel": yellow_color,
                    "Click_spring": red_color,
                    "Barrel_arbor": yellow_color,
                    "Barrel_bridge": gray_color,
                    "Ratchet_wheel": green_color,
                    "Crown_wheel_screw": dark_gray_color,

                }, {
                    "Crown_wheel": -5.5 * smooth_step(0.5, 0.0, arg0),
                    "Crown_wheel_screw": -8.5 * smooth_step(1, 0.5, arg0),
                    "Crown_wheel_screw_a": -10 * smooth_step(1, 0.92, arg0),

                }, {
                    "arbor": 0.17
                });

                ctx.drawImage(gl.finish(), 0, 0, width, height);
            } else if (mode === "crown_wheel_ccw") {
                gl.begin(width, height);



                gl.draw_mesh("Arrow_curve", mat4_mul(mat4_mul(mat4_mul(vp, translation_mat4([0.58, 6.984, -1.8])), scale_mat4([0.7, 0.7, 0.3])), mat4_mul(rot_z_mat4(-0.9), rot_y_mat4(0))), mat3_mul(rot, mat3_mul(rot_z_mat3(-0.9), rot_y_mat3(0))), crown_turn_arrow_color)



                draw_complete_assembly(vp, rot, 40, {
                    "Click": blue_color,
                    "Click_spring": red_color,
                    "Crown_wheel": yellow_color,
                    "Ratchet_wheel": green_color,

                }, undefined, {
                    "arbor": t * 0.25
                });

                ctx.drawImage(gl.finish(), 0, 0, width, height);
            } else if (mode === "crown_wheel_cw") {
                gl.begin(width, height);

                gl.draw_mesh("Arrow_curve", mat4_mul(mat4_mul(mat4_mul(vp, translation_mat4([0.58, 6.984, -1.5])), scale_mat4([0.7, 0.7, 0.3])), mat4_mul(rot_z_mat4(0.4), rot_y_mat4(pi))), mat3_mul(rot, mat3_mul(rot_z_mat3(0.4), rot_y_mat3(pi))), crown_turn_arrow_color)

                let a = Math.sin(t * 7) * 0.007 - 0.04;

                draw_complete_assembly(vp, rot, 40, {
                    "Click": blue_color,

                    "Click_spring": red_color,
                    "Crown_wheel": yellow_color,
                    "Ratchet_wheel": green_color,

                }, undefined, {
                    "arbor": a,
                    "click": a * 0.4
                });

                ctx.drawImage(gl.finish(), 0, 0, width, height);
            } else if (mode === "crown_wheel_go") {
                gl.begin(width, height);


                sim[0] = Math.max(arg0, sim[0]);
                sim_slider.set_value(sim[0]);

                if (sim[0] == 0)
                    self.set_paused(true);
                else
                    self.set_paused(false);

                if (sim[0] != 0) {
                    sim[2] += dt;
                    sim[5] = Math.min(1, sim[5] + 0.2 * dt);
                }
                else {
                    sim[2] = Math.round(sim[2] * 4) * 0.25;
                    sim[5] = 0;
                }


                draw_complete_assembly(vp, rot, 40, {
                    "Click": blue_color,

                    "Click_spring": red_color,
                    "Crown_wheel": yellow_color,
                    "Ratchet_wheel": green_color,

                }, undefined, {
                    "arbor": sim[0] * 4.97,
                    "balance_time": sim[0] > 0 ? t : 0,
                    "show_second_hand": true,
                    "balance_amp_scale": sim[5],

                });

                ctx.drawImage(gl.finish(), 0, 0, width, height);
            } else if (mode === "cannon_pinion_assembly") {
                gl.begin(width, height);

                draw_complete_assembly(vp, rot, 45, {
                    "Third": yellow_color,
                    "Cannon_wheel": blue_color,
                    "Cannon_pinion": green_color,

                }, {
                    "Cannon_wheel": 8 * smooth_step(1, 0.0, arg0),
                    "Cannon_pinion": 8 * smooth_step(1, 0.0, arg0),
                });

                ctx.drawImage(gl.finish(), 0, 0, width, height);
            } else if (mode === "cannon_pinion_action") {
                sim[0] += dt * Math.exp(arg0 * 5);


                gl.begin(width, height);

                draw_complete_assembly(vp, rot, 45, {
                    "Third": dark_gray_color,
                    "Cannon_wheel": blue_color,
                    "Cannon_pinion": green_color,

                }, undefined, {
                    "balance_time": sim[0],
                    "show_second_hand": true,
                    "show_minute_hand": true,


                });

                ctx.drawImage(gl.finish(), 0, 0, width, height);
            } else if (mode === "hour_wheel_assembly") {
                gl.begin(width, height);

                draw_complete_assembly(vp, rot, 48, {
                    "Third": dark_gray_color,
                    "Cannon_wheel": blue_color,
                    "Cannon_pinion": green_color,

                    "Intermediate_wheel": red_color,
                    "Hour_wheel": yellow_color,
                }, {
                    "Intermediate_wheel": 5 * smooth_step(0.5, 0.0, arg0),
                    "Hour_wheel": 8 * smooth_step(1, 0.5, arg0),

                });

                ctx.drawImage(gl.finish(), 0, 0, width, height);
            } else if (mode === "hour_wheel_action") {
                sim[0] += dt * Math.exp(arg0 * 5);

                gl.begin(width, height);

                draw_complete_assembly(vp, rot, 48, {
                    "Third": dark_gray_color,
                    "Cannon_wheel": blue_color,
                    "Cannon_pinion": green_color,

                    "Intermediate_wheel": red_color,
                    "Hour_wheel": yellow_color,

                }, undefined, {
                    "balance_time": sim[0],
                    "show_second_hand": true,
                    "show_minute_hand": true,
                    "show_hour_hand": true,
                    "show_dial": true,
                });

                ctx.drawImage(gl.finish(), 0, 0, width, height);
            } else if (mode === "date_assembly") {
                gl.begin(width, height);

                let mvp = mat4_mul(vp, translation_mat4([0, 0, -4 * (1 - smooth_step(0.9, 1, arg0))]));
                draw_complete_assembly(mvp, rot, 50, {
                    "Hour_wheel": yellow_color,
                    "Date_indicator_gear": green_color,
                    "Date_indicator_cover": green_color,
                    "Date_indicator_spring": orange_color,
                    "Date_jumper_gears": blue_color,
                    "Date_jumper_plate": bridge_color,
                    "Date_jumper": red_color,
                    "Date_jumper_plate_screw": dark_gray_color,
                }, {

                    "Date_jumper": 3 * smooth_step(1 / 5, 0.0, arg0),
                    "Date_indicator": 5 * smooth_step(2 / 5, 1 / 5, arg0),

                    "Date_jumper_flex": -0.17 * smooth_step(3 / 5, 2 / 5, arg0),
                    "Date_ring": 8 * smooth_step(3 / 5, 2 / 5, arg0),
                    "Date_jumper_plate": 11 * smooth_step(4 / 5, 3 / 5, arg0),
                    "Date_jumper_plate_screw": 13 * smooth_step(1, 4 / 5, arg0),
                    "Date_jumper_plate_screw_a": -10 * smooth_step(1, 0.95, arg0),

                }, {
                    "show_date_ring": true
                });

                ctx.drawImage(gl.finish(), 0, 0, width, height);
            } else if (mode === "date_action") {
                gl.begin(width, height);

                let mvp = mat4_mul(mat4_mul(vp, scale_mat4(1.15)), translation_mat4([0, 0, -2]));
                draw_complete_assembly(mvp, rot, 50, {
                    "Hour_wheel": yellow_color,
                    "Date_indicator_gear": green_color,
                    "Date_indicator_cover": green_color,
                    "Date_indicator_spring": orange_color,
                    "Date_jumper_gears": blue_color,
                    "Date_jumper_plate": bridge_color,
                    "Date_jumper": red_color,
                    "Date_jumper_plate_screw": dark_gray_color,
                }, {
                    "Mainplate": Infinity,
                    "Second": Infinity,
                    "First": Infinity,
                    "Third": Infinity,
                    "Fourth": Infinity,
                    "Escape": Infinity,
                    "Pallet_fork": Infinity,
                    "Pallet_bridge": Infinity,
                    "Barrel_bridge": Infinity,
                    "Train_bridge": Infinity,
                    "Stop_lever": Infinity,
                    "Click": Infinity,
                    "Click_spring": Infinity,
                    "Crown_wheel": Infinity,
                    "Ratchet_wheel": Infinity,
                    "Balance_assembly_x": Infinity,
                    "Cannon_wheel": Infinity,
                    "Cannon_pinion": Infinity,
                    "Intermediate_wheel": Infinity,
                    "Date_indicator_cover_hidden": true

                }, {
                    "show_date_ring": true,
                    "mode": mode_time_set,
                    "setting_wheel": -arg0 * 35 - 170,
                    "skip_screws": true,
                    "show_hour_hand": true,
                });

                ctx.drawImage(gl.finish(), 0, 0, width, height);
            } else if (mode === "date_flow") {

                gl.begin(width, width);

                let mvp = ortho_proj;
                mvp = mat4_mul(mvp, scale_mat4(0.5));
                mvp = mat4_mul(mvp, translation_mat4([-13.5, 0, 0]));
                mvp = mat4_mul(mvp, rot_z_mat4(-pi * 0.5));

                let setting_angle = -t * 40;
                let intermediate_angle = -setting_angle * ws_n / wi0_n + 0.22;
                let hour_angle = -intermediate_angle * wi1_n / wh0_n + 0.02;


                draw_complete_assembly(mvp, ident_mat3, -20, {
                    "Hour_wheel": yellow_color,

                }, {}, {
                    "show_date_ring": true,
                    "mode": mode_time_set,
                    "setting_wheel": setting_angle,
                    "skip_screws": true,
                    "show_dial": true,
                    "show_hour_hand": true,
                    "date_ring_angle": hour_angle / (2 * 31) - 4 / 31 * pi + 0.05,
                });

                mvp = ortho_proj;
                mvp = mat4_mul(mvp, scale_mat4(0.5));
                mvp = mat4_mul(mvp, translation_mat4([13.5, 0, 0]));
                mvp = mat4_mul(mvp, rot_z_mat4(-pi * 0.5));


                draw_complete_assembly(mvp, ident_mat3, -20, {
                    "Hour_wheel": yellow_color,

                }, {}, {
                    "show_date_ring": true,
                    "mode": mode_time_set,
                    "setting_wheel": setting_angle,
                    "skip_screws": true,
                    "show_dial": true,
                    "show_hour_hand": true,
                });

                ctx.drawImage(gl.finish(), 0, Math.round((- width + height) * 0.5) - font_size, width, width);

                ctx.fillStyle = "#333";
                ctx.fillText("bad indicator", width * 0.25, height - font_size * 0.7);
                ctx.fillText("good indicator", width * 0.75, height - font_size * 0.7);

            } else if (mode === "hour_wheel_time_set" || mode === "hour_wheel_time_set2") {
                gl.begin(width, height);

                draw_complete_assembly(vp, rot, 50, {
                    "Cannon_wheel": blue_color,
                    "Cannon_pinion": green_color,

                    "Intermediate_wheel": red_color,
                    "Hour_wheel": yellow_color,
                    "Date_jumper_gears": mode === "hour_wheel_time_set2" ? blue_color : undefined,
                    "Date_indicator_gear": mode === "hour_wheel_time_set2" ? green_color : undefined,
                    "Date_indicator_cover": mode === "hour_wheel_time_set2" ? green_color : undefined,
                    "Date_indicator_spring": mode === "hour_wheel_time_set2" ? orange_color : undefined,
                }, {
                    "Hour_wheel": mode === "hour_wheel_time_set" ? 400 : 0,
                }, {
                    "mode": mode_time_set,
                    "time_set_only_minutes": mode === "hour_wheel_time_set",
                    "setting_wheel": arg0 * (mode === "hour_wheel_time_set" ? 2 : 20) + 80,
                    "show_date_ring": true,

                    "show_minute_hand": true,
                    "show_hour_hand": mode === "hour_wheel_time_set2",
                });

                ctx.drawImage(gl.finish(), 0, 0, width, height);
            } else if (mode === "stem_crown") {
                let st = smooth_step(1, 0.8, 1);
                let t = smooth_step(0.8, 0, 1);
                let mvp = mat4_mul(vp, mat4_mul(scale_mat4(2.5 - 0.7 * st), translation_mat4([0, -11, 0])));

                gl.begin(width, height);
                draw_crown(mat4_mul(mvp, translation_mat4([0, 0, 0])), rot, 0, 0, dark_gray_color);

                draw_winding_stem(mat4_mul(mvp, translation_mat4([0, 0, 0])), rot, 0, 0, gray_color);

                ctx.drawImage(gl.finish(), 0, 0, width, height);
            } else if (mode === "winding_sliding_pinion") {
                let t0 = smooth_step(0.5, 0, arg0);
                let t1 = smooth_step(1, 0.5, arg0);


                let mvp = mat4_mul(vp, mat4_mul(scale_mat4(2.4 - 0.7 * t1), translation_mat4([0, lerp(-11.2, -8.75, t1), 0])));
                gl.begin(width, height);
                draw_crown(mat4_mul(mvp, translation_mat4([0, 0, 0])), rot, 0, 0, dark_gray_color);
                draw_winding_stem(mat4_mul(mvp, translation_mat4([0, 0, 0])), rot, 0, 0, gray_color);
                draw_winding_pinion(mat4_mul(mvp, translation_mat4([0, -0.2 - 5 * t0, 0])), rot, 0, red_color);
                draw_sliding_pinion(mat4_mul(mvp, translation_mat4([0, -0.5 - 6.5 * t1, 0])), rot, 0, 0, blue_color);
                ctx.drawImage(gl.finish(), 0, 0, width, height);
            } else if (mode === "sliding_pinion_rotation") {
                let mvp = mat4_mul(vp, mat4_mul(scale_mat4(2.4), translation_mat4([0, -11.2, 0])));
                let angle = -arg0 * 2;
                let sliding_offset = 0.0;
                if (mode === "sliding_pinion_rotation")
                    sliding_offset = -0.5;

                gl.begin(width, height);
                draw_crown(mvp, rot, angle, 0, dark_gray_color);
                draw_winding_stem(mvp, rot, angle, 0, gray_color);
                draw_winding_pinion(mvp, rot, 0, red_color);
                draw_sliding_pinion(mvp, rot, angle, sliding_offset, blue_color);

                draw_crown_turn_arrows(mvp, rot);

                ctx.drawImage(gl.finish(), 0, 0, width, height);
            } else if (mode === "crown_stem_pinion_assembly") {
                gl.begin(width, height);

                let sc = 0.7 + smooth_step(0.8, 1, arg0) * 0.25;
                draw_complete_assembly(mat4_mul(vp, scale_mat4(sc)), rot, 90, {
                    "Winding_pinion": red_color,
                    "Sliding_pinion": blue_color,
                    "Crown_wheel": yellow_color,
                }, {
                    "Winding_pinion": 8.0 * smooth_step(0.3, 0.0, arg0),
                    "Sliding_pinion": 12.0 * smooth_step(0.6, 0.3, arg0),
                }, {
                    "sliding_offset": -0.5,
                    "stem_offset": 8.0 * smooth_step(1.0, 0.6, arg0),
                });

                ctx.drawImage(gl.finish(), 0, 0, width, height);

                ctx.feather(width * scale, height * scale,
                    canvas.height * 0.05, canvas.height * 0.05,
                    canvas.height * 0.05, canvas.height * 0.05);
            } else if (mode === "crown_stem_pinion_turn") {

                sim_crown_wind(3);
                let angle = -arg0 * 3;


                gl.begin(width, height);
                gl.set_line_offset(-0.0003);

                let mvp = mat4_mul(scale_mat4([2, 2, 0.5]), vp);
                mvp = mat4_mul(mvp, translation_mat4([0, -11, 0]));

                draw_crown_turn_arrows(mvp, rot);

                {

                    let m = scale_mat4(0.4);
                    m = mat4_mul(translation_mat4([0, 8.1, 1.6]), m);

                    let r = ident_mat3;
                    gl.draw_mesh("Arrow", mat4_mul(mvp, m), mat3_mul(rot, r), blue_color);
                }



                draw_complete_assembly(mvp, rot, 90, {
                    "Winding_pinion": red_color,
                    "Sliding_pinion": blue_color,
                    "Crown_wheel": yellow_color,
                }, undefined, {
                    "crown": angle,
                    "sliding_offset": -sim[2] * 0.2,
                    "winding": sim[1],
                });

                ctx.drawImage(gl.finish(), 0, 0, width, height);

                ctx.feather(width * scale, height * scale,
                    canvas.height * 0.1, canvas.height * 0.1,
                    canvas.height * 0.1, canvas.height * 0.1);
            } else if (mode === "corrector_setting_level_assembly") {
                gl.begin(width, height);

                draw_complete_assembly(mat4_mul(vp, scale_mat4(0.9)), rot, 100, keyless_colors, {
                    "Corrector_lever": 8 * smooth_step(0.7, 0.0, arg0),
                    "Setting_lever": 12 * smooth_step(1, 0.3, arg0),
                });

                ctx.drawImage(gl.finish(), 0, 0, width, height);

                ctx.feather(width * scale, height * scale,
                    canvas.height * 0.05, canvas.height * 0.05,
                    canvas.height * 0.05, canvas.height * 0.05);
            } else if (mode === "corrector_setting_level_interaction") {
                gl.begin(width, height);

                gl.set_line_offset(-0.0003);

                let mvp = mat4_mul(scale_mat4([2, 2, 0.5]), vp);
                mvp = mat4_mul(mvp, translation_mat4([0, -12, 0]));

                draw_crown_pull_arrows(mat4_mul(mvp, translation_mat4([0, 0.8 * arg0, 0])), rot);


                draw_complete_assembly(mvp, rot, 100, keyless_colors, undefined, {
                    "stem_offset": 0.8 * arg0,
                    "sliding_offset": 0
                });

                ctx.drawImage(gl.finish(), 0, 0, width, height);

                ctx.feather(width * scale, height * scale,
                    canvas.height * 0.1, canvas.height * 0.1,
                    canvas.height * 0.1, canvas.height * 0.1);
            } else if (mode === "corrector_setting_level_interaction1") {

                gl.begin(width, height);

                let mvp = mat4_mul(mat4_mul(vp, scale_mat4(1.8)), translation_mat4([0, -13, 0]));

                let stem_offset = 0.8 * arg0;
                let sliding_offset = 0

                draw_crown(mvp, rot, 0, stem_offset);
                draw_winding_stem(mvp, rot, 0, stem_offset);

                draw_crown_pull_arrows(mat4_mul(mvp, translation_mat4([0, stem_offset, 0])), rot);

                draw_keyless_mechanism(mvp, rot, 100, {
                    "Corrector_lever": yellow_color,
                    "Setting_lever": green_color,
                    "Setting_wheel": orange_color,
                    "Yoke": cyan_color,
                    "Setting_lever_jumper": violet_color,
                    "Sliding_pinion": blue_color,
                    "Winding_pinion": red_color,


                    "Setting_lever_pivot": red_color,
                    "Setting_lever_pivot2": orange_color,
                }, {}, stem_offset, 0);



                ctx.drawImage(gl.finish(), 0, 0, width, height);
            } else if (mode === "setting_wheel_asembly") {
                gl.begin(width, height);

                draw_complete_assembly(mat4_mul(vp, scale_mat4(0.9)), rot, 110, keyless_colors, {
                    "Setting_wheel": 10 * smooth_step(0.5, 0.0, arg0),
                }, {
                    "setting_wheel": Math.sin(pi * smooth_step(1, 0.5, arg0)) * 0.5
                });

                ctx.drawImage(gl.finish(), 0, 0, width, height);
                ctx.feather(width * scale, height * scale,
                    canvas.height * 0.05, canvas.height * 0.05,
                    canvas.height * 0.05, canvas.height * 0.05);
            } else if (mode === "setting_wheel_interaction") {
                gl.begin(width, height);


                draw_crown_pull_arrows(mat4_mul(mat4_mul(vp, scale_mat4(0.9)), translation_mat4([0, 0.8 * arg0, 0])), rot);

                draw_complete_assembly(mat4_mul(vp, scale_mat4(0.9)), rot, 110, keyless_colors, undefined, {
                    "stem_offset": 0.8 * arg0,
                    "sliding_offset": 0
                });

                ctx.drawImage(gl.finish(), 0, 0, width, height);
                ctx.feather(width * scale, height * scale,
                    canvas.height * 0.05, canvas.height * 0.05,
                    canvas.height * 0.05, canvas.height * 0.05);
            } else if (mode === "setting_wheel_sliding_pinion_interaction") {
                gl.begin(width, height);

                draw_crown_turn_arrows(mat4_mul(vp, scale_mat4(0.95)), rot);
                draw_complete_assembly(mat4_mul(vp, scale_mat4(0.95)), rot, 110, keyless_colors, undefined, {
                    "stem_offset": 0.8,
                    "sliding_offset": -0.678,
                    "crown": -arg0 * 4 + 13147,
                    "winding": 0,
                    "mode": mode_time_set,

                    "show_second_hand": true,
                    "show_minute_hand": true,
                    "show_hour_hand": true,
                });

                ctx.drawImage(gl.finish(), 0, 0, width, height);

                ctx.feather(width * scale, height * scale,
                    canvas.height * 0.05, canvas.height * 0.05,
                    canvas.height * 0.05, canvas.height * 0.05);

            } else if (mode === "yoke_asembly") {
                gl.begin(width, height);

                draw_complete_assembly(mat4_mul(vp, scale_mat4(0.9)), rot, 120, keyless_colors, {
                    "Yoke": 10 * smooth_step(1.0, 0.0, arg0),
                });

                ctx.drawImage(gl.finish(), 0, 0, width, height);

                ctx.feather(width * scale, height * scale,
                    canvas.height * 0.05, canvas.height * 0.05,
                    canvas.height * 0.05, canvas.height * 0.05);

            } else if (mode === "yoke_interaction") {
                gl.begin(width, height);

                gl.set_line_offset(-0.0003);

                let mvp = mat4_mul(scale_mat4([1.8, 1.8, 0.5]), vp);
                mvp = mat4_mul(mvp, translation_mat4([0, -11.5, 0]));

                draw_crown_pull_arrows(mat4_mul(mvp, translation_mat4([0, 0.8 * arg0, 0])), rot);


                draw_complete_assembly(mvp, rot, 120, keyless_colors, undefined, {
                    "stem_offset": 0.8 * arg0,
                    "mode": mode_crown_pull,

                });

                ctx.drawImage(gl.finish(), 0, 0, width, height);

                ctx.feather(width * scale, height * scale,
                    canvas.height * 0.1, canvas.height * 0.1,
                    canvas.height * 0.1, canvas.height * 0.1);
            } else if (mode === "jumper_asembly") {
                gl.begin(width, height);

                draw_complete_assembly(mat4_mul(vp, scale_mat4(0.9)), rot, 130, {
                    "Corrector_lever": yellow_color,
                    "Setting_lever": green_color,
                    "Setting_wheel": orange_color,
                    "Yoke": cyan_color,
                    "Setting_lever_jumper": violet_color,
                    "Sliding_pinion": blue_color,
                    "Winding_pinion": red_color,
                    "Setting_lever_jumper_screw": dark_gray_color,
                }, {
                    "Setting_lever_jumper": 8 * smooth_step(0.5, 0.0, arg0),
                    "Setting_lever_jumper_screw": 12 * smooth_step(1, 0.5, arg0),
                    "Setting_lever_jumper_screw_a": -16 * smooth_step(1, 0.8, arg0),
                });

                ctx.drawImage(gl.finish(), 0, 0, width, height);

                ctx.feather(width * scale, height * scale,
                    canvas.height * 0.05, canvas.height * 0.05,
                    canvas.height * 0.05, canvas.height * 0.05);
            } else if (mode === "jumper_interaction" || mode === "jumper_interaction2") {

                sim_crown_pull(dt);

                let stem_offset = 0.8 * arg0;

                gl.begin(width, height);

                gl.set_line_offset(-0.0003);

                let sc = mode === "jumper_interaction" ? 2 : 1.5;
                let tr = mode === "jumper_interaction" ? -11.5 : -9;

                let mvp = mat4_mul(scale_mat4([sc, sc, 0.5]), vp);
                mvp = mat4_mul(mvp, translation_mat4([0, tr, 0]));

                draw_crown_pull_arrows(mat4_mul(mvp, translation_mat4([0, 0.8 * arg0, 0])), rot);

                if (mode === "jumper_interaction") {

                    let jumper_bend = 0.078;
                    jumper_bend += Math.pow(smooth_step(0.00, 0.18, stem_offset), 0.7) * 0.03;
                    jumper_bend += -Math.pow(smooth_step(0.16, 0.31, stem_offset), 3) * 0.028;
                    jumper_bend += Math.pow(smooth_step(0.31, 0.5, stem_offset), 0.6) * 0.064;
                    jumper_bend += -Math.pow(sharp_step(0.5, 0.8, stem_offset), 1.5) * 0.063;

                    jumper_bend *= 1.5;

                    let sc = 0.3;

                    let m;
                    m = translation_mat4([2.5, 9.4, 1.7]);
                    m = mat4_mul(m, translation_mat4([4, 0, 0]));
                    m = mat4_mul(m, rot_z_mat4(jumper_bend));
                    m = mat4_mul(m, translation_mat4([-4, 0, 0]));
                    m = mat4_mul(m, rot_z_mat4(0.4));
                    m = mat4_mul(m, rot_x_mat4(-0.4));
                    m = mat4_mul(m, scale_mat4([sc, sc, 0.2]));

                    let r = rot_z_mat3(0.4);
                    r = mat3_mul(r, rot_x_mat3(-0.4));
                    gl.draw_mesh("Arrow", mat4_mul(mvp, m), mat3_mul(rot, r), dark_gray_color);

                    m = translation_mat4([3.1, 9.7, 1.7]);
                    m = mat4_mul(m, translation_mat4([4, 0, 0]));
                    m = mat4_mul(m, rot_z_mat4(jumper_bend));
                    m = mat4_mul(m, translation_mat4([-4, 0, 0]));
                    m = mat4_mul(m, rot_z_mat4(0.9));
                    m = mat4_mul(m, rot_x_mat4(-0.4));
                    m = mat4_mul(m, scale_mat4([sc, sc, 0.2]));

                    r = rot_z_mat3(0.9);
                    r = mat3_mul(r, rot_x_mat3(-0.4));
                    gl.draw_mesh("Arrow", mat4_mul(mvp, m), mat3_mul(rot, r), dark_gray_color);


                    m = translation_mat4([1.7, 9.1, 1.7]);
                    m = mat4_mul(m, translation_mat4([4, 0, 0]));
                    m = mat4_mul(m, rot_z_mat4(jumper_bend));
                    m = mat4_mul(m, translation_mat4([-4, 0, 0]));
                    m = mat4_mul(m, rot_z_mat4(0.1));
                    m = mat4_mul(m, rot_x_mat4(-0.4));
                    m = mat4_mul(m, scale_mat4([sc, sc, 0.2]));

                    r = rot_z_mat3(0.1);
                    r = mat3_mul(r, rot_x_mat3(-0.4));
                    gl.draw_mesh("Arrow", mat4_mul(mvp, m), mat3_mul(rot, r), dark_gray_color);
                } else {

                    let jumper_spring_bend = -0.01 + yoke_angle_(stem_offset) * 0.09;
                    let m;
                    m = translation_mat4([-7, 8.6, 1.7]);
                    m = mat4_mul(m, translation_mat4([7, 0, 0]));
                    m = mat4_mul(m, rot_z_mat4(jumper_spring_bend));
                    m = mat4_mul(m, translation_mat4([-7, 0, 0]));
                    m = mat4_mul(m, rot_z_mat4(3.4));
                    m = mat4_mul(m, rot_x_mat4(-0.5));
                    m = mat4_mul(m, scale_mat4([0.5, 0.5, 0.2]));

                    let r = rot_z_mat3(0.4);
                    r = mat3_mul(r, rot_x_mat3(-0.4));
                    gl.draw_mesh("Arrow", mat4_mul(mvp, m), mat3_mul(rot, r), dark_gray_color);

                }

                let colors = {
                    "Corrector_lever": yellow_color,
                    "Setting_lever": green_color,
                    "Setting_wheel": orange_color,
                    "Yoke": cyan_color,
                    "Setting_lever_jumper": violet_color,
                    "Sliding_pinion": blue_color,
                    "Winding_pinion": red_color,

                }

                if (mode === "jumper_interaction") {
                    colors["Setting_lever_pivot3"] = digit_color;
                }

                draw_complete_assembly(mvp, rot, 130, colors, {}, {
                    "stem_offset": stem_offset,
                    "mode": mode_crown_pull,
                });

                ctx.drawImage(gl.finish(), 0, 0, width, height);

                ctx.feather(width * scale, height * scale,
                    canvas.height * 0.1, canvas.height * 0.1,
                    canvas.height * 0.1, canvas.height * 0.1);
            } else if (mode === "stop_lever_interaction") {

                sim_crown_pull(dt, false);

                gl.begin(width, height);
                draw_crown_pull_arrows(mat4_mul(mat4_mul(vp, scale_mat4(0.9)), translation_mat4([0, 0.8 * arg0, 0])), rot);

                if (arg0 < 0.85 && !self.paused)
                    sim[1] += dt;

                draw_complete_assembly(mat4_mul(vp, scale_mat4(0.9)), rot, 130, {
                    "Sliding_pinion": blue_color,
                    "Balance_wheel": violet_color,

                    "Stop_lever": cyan_color,
                }, {
                    "Barrel_bridge": Infinity,
                    "Barrel_bridge_screw": Infinity,
                    "Click": Infinity,
                    "Click_spring": Infinity,
                    "Crown_wheel": Infinity,
                    "Crown_wheel_screw": Infinity,
                }, {
                    "stem_offset": 0.8 * arg0,
                    "balance_time": sim[1],
                });

                ctx.drawImage(gl.finish(), 0, 0, width, height);

                ctx.feather(width * scale, height * scale,
                    canvas.height * 0.05, canvas.height * 0.05,
                    canvas.height * 0.05, canvas.height * 0.05);
            } else if (mode === "crown_wind") {

                sim_crown_wind(3);
                let angle = -arg0 * 3;

                gl.begin(width, height);
                draw_crown_turn_arrows(mat4_mul(vp, scale_mat4(0.9)), rot);

                sim[3] += dt;

                draw_complete_assembly(mat4_mul(vp, scale_mat4(0.9)), rot, 130, {
                    "Yoke": cyan_color,
                    "Crown_wheel": yellow_color,
                    "Ratchet_wheel": green_color,
                    "Sliding_pinion": blue_color,
                    "Winding_pinion": red_color,
                }, {
                    "yoke_angle_override": -sim[2] * 0.03 - 0.12,
                }, {
                    "crown": angle,
                    "sliding_offset": -sim[2] * 0.2,
                    "winding": sim[1],
                    "balance_time": sim[3],
                });

                ctx.drawImage(gl.finish(), 0, 0, width, height);
                ctx.feather(width * scale, height * scale,
                    canvas.height * 0.05, canvas.height * 0.05,
                    canvas.height * 0.05, canvas.height * 0.05);
            } else if (mode === "crown_time_set") {

                let angle = -arg0 * 3 + 1000;

                gl.begin(width, height);
                draw_crown_turn_arrows(mat4_mul(vp, scale_mat4(0.9)), rot);

                draw_complete_assembly(mat4_mul(vp, scale_mat4(0.9)), rot, 130, {
                    "Hour_wheel": yellow_color,
                    "Yoke": cyan_color,
                    "Sliding_pinion": blue_color,
                    "Setting_wheel": orange_color,
                    "Intermediate_wheel": red_color,

                }, undefined, {
                    "crown": angle,
                    "stem_offset": 0.8,
                    "winding": 0,
                    "mode": mode_time_set,
                    "show_second_hand": true,
                    "show_minute_hand": true,
                    "show_hour_hand": true,
                });
                ctx.drawImage(gl.finish(), 0, 0, width, height);

                ctx.feather(width * scale, height * scale,
                    canvas.height * 0.05, canvas.height * 0.05,
                    canvas.height * 0.05, canvas.height * 0.05);

            } else if (mode === "crown_date_set_assembly") {

                gl.begin(width, height);

                draw_complete_assembly(mat4_mul(vp, scale_mat4(0.9)), rot, 135, keyless_colors, { "Date_corrector": smooth_step(0.45, 0, arg0) * 6 },
                    {
                        "date_corrector_offset": Math.sin(smooth_step(1, 0.55, arg0) * 2 * pi) * 0.2,

                        "stem_offset": 0.8,
                        "winding": 0,
                        "mode": mode_time_set,
                    });
                ctx.drawImage(gl.finish(), 0, 0, width, height);

                ctx.feather(width * scale, height * scale,
                    canvas.height * 0.05, canvas.height * 0.05,
                    canvas.height * 0.05, canvas.height * 0.05);
            } else if (mode === "crown_date_set") {

                let crown_angle = -arg0 * 20;

                let da = crown_angle - sim[0];

                let prev_cf = sim[2];
                let current_offset = sim[1];

                let offset_limit = 1.0;

                if (prev_cf <= 0.7 && prev_cf >= 0.29 && current_offset <= 0.1)
                    offset_limit = 0.1;


                current_offset = Math.min(offset_limit, Math.max(-1, current_offset - da * 2.1 * wsliding_n / wdcorr_n));

                sim[0] = crown_angle;

                sim[1] = current_offset;

                let setting_wheel_angle = -crown_angle * wsliding_n / ws_n - 0.04;

                let corrector_angle = 32 * pi - setting_wheel_angle * ws_n / wdcorr_n + 0.145 * sim[1] + 0.27;


                let cf = (corrector_angle * 3 / (2 * pi)) % 1;

                sim[2] = cf;

                let date_ring_delta = sim[5];

                const dragging = 1;
                const anim_forward = 2;
                const anim_back = 3;

                if (sim[4] == dragging) {
                    if (cf < 0.31) {
                        sim[3] -= 2 * pi / 31;
                        sim[4] = anim_forward;
                        date_ring_delta = 2 * pi / 31 + date_ring_delta;

                        self.set_paused(false);
                    } else if (cf > 0.7 || current_offset <= 0.1) {
                        sim[4] = anim_back;

                        self.set_paused(false);
                    }
                } else if (prev_cf > 0.7 && cf <= 0.7 && current_offset > 0.1 && da < 0) {
                    sim[4] = 1;
                }

                let speed = 2;

                if (sim[4] == dragging) {
                    date_ring_delta = -sharp_step(0.7, 0.31, cf) * 0.115 -
                        sharp_step(0.31, 0.295, cf) * (2 * pi / 31 - 0.115)
                } else if (sim[4] == anim_forward) {
                    date_ring_delta -= dt * speed;
                    if (date_ring_delta <= 0) {
                        date_ring_delta = 0;
                        sim[4] = 0;
                        self.set_paused(true);
                    }
                } else if (sim[4] == anim_back) {
                    date_ring_delta += dt * speed;
                    if (date_ring_delta >= 0) {
                        date_ring_delta = 0;
                        sim[4] = 0;
                        self.set_paused(true);
                    }
                }

                sim[5] = date_ring_delta;


                gl.begin(width, height);
                draw_crown_turn_arrows(mat4_mul(vp, scale_mat4(0.9)), rot);

                let colors = {};
                Object.assign(colors, keyless_colors);
                colors["Winding_pinion"] = undefined;
                colors["Date_jumper"] = red_color;

                draw_complete_assembly(mat4_mul(vp, scale_mat4(0.9)), rot, 135, colors, undefined,
                    {
                        "crown": crown_angle,
                        "stem_offset": 0.8 * 0.4,
                        "setting_wheel": setting_wheel_angle,
                        "winding": 0,
                        "date_ring_angle": sim[3] + date_ring_delta,
                        "date_corrector_angle": corrector_angle,
                        "date_corrector_offset": sim[1] * 0.2,
                        "mode": mode_date_set,
                        "show_date_ring": true,
                        "time_set_only_minutes": true,
                    });
                ctx.drawImage(gl.finish(), 0, 0, width, height);

                ctx.feather(width * scale, height * scale,
                    canvas.height * 0.05, canvas.height * 0.05,
                    canvas.height * 0.05, canvas.height * 0.05);

            } else if (mode === "minute_bridge_assembly") {

                gl.begin(width, height);

                draw_complete_assembly(mat4_mul(vp, scale_mat4(0.81)), rot, 140, {
                    "Minute_train_bridge": bridge_color,
                    "Minute_train_bridge_screw": dark_gray_color,

                }, {
                    "Minute_train_bridge": smooth_step(0.5, 0, arg0) * 6,
                    "Minute_train_bridge_screw": smooth_step(1.0, 0.5, arg0) * 8,
                    "Minute_train_bridge_screw_a": smooth_step(1.0, 0.9, arg0) * -16,
                },
                    {
                        "show_date_ring": true
                    });
                ctx.drawImage(gl.finish(), 0, 0, width, height);
            } else if (mode === "automatic_assembly_base") {


                let weight_angle = smooth_step(0.7, 0.5, arg0) * -pi;

                if (sim[0] == 0) {
                    sim[0] = [0, 0, 0, 0, 0];
                    sim[1] = [0, 0, 0, 0, 0];
                }


                let t0 = -weight_angle * wweight_n / wrev_t_n + 0.13;
                let t1 = -weight_angle * wweight_n / wrev_t_n + 0.16;


                sim_reverse_gear(sim[0], t0, false);
                sim_reverse_gear(sim[1], t1, true);

                gl.begin(width, height);

                draw_complete_assembly(mat4_mul(mat4_mul(vp, scale_mat4(0.8)), translation_mat4([0, 0, smooth_step(0.3, 0, arg0) * 6])), rot, 150, {
                    "Weight": blue_color,
                    "First": red_color,

                    "Ratchet_wheel": green_color,
                    "Reversing_wheel_bottom": yellow_color,
                    "Reversing_wheel_top": yellow_color,
                    "Reversing_wheel_top_cw": yellow_color,
                    "Reversing_wheel_bottom_cw": yellow_color,
                    "Automatic_gear0": yellow_color,
                    "Automatic_gear1": orange_color,
                    "Automatic_device_framework_screw0": dark_gray_color,
                    "Automatic_device_framework_screw1": dark_gray_color,
                }, {
                    "Automatic_assembly": smooth_step(0.3, 0, arg0) * -12,
                    "Automatic_device_framework_screw1": smooth_step(0.5, 0.2, arg0) * -4,
                    "Automatic_device_framework_screw1_a": smooth_step(0.5, 0.4, arg0) * 10,

                    "Automatic_device_framework_screw0": smooth_step(1, 0.7, arg0) * -4,
                    "Automatic_device_framework_screw0_a": smooth_step(1, 0.9, arg0) * 10,
                }
                    , {
                        "Weight_angle": weight_angle,
                        "show_date_ring": true,
                        "auto_params": reverse_sim_params(sim[0], sim[1])
                    }
                );
                ctx.drawImage(gl.finish(), 0, 0, width, height);
            } else if (mode === "automatic_gravity") {

                let dd = [0, 1, 0];
                dd = mat3_mul_vec(mat3_invert(rot), dd);

                let a = sim[2];
                let w = sim[3];

                let dir = [Math.cos(a), Math.sin(a)];
                let f = dir[0] * dd[1] - dir[1] * dd[0];


                w += f * dt * 200 - w * 6 * dt;
                a += w * dt;


                if (Math.abs(f) < 0.001 && Math.abs(w) < 0.001)
                    self.set_paused(true);
                else
                    self.set_paused(false);

                sim[3] = w;
                sim[2] = a;



                let weight_angle = a - pi / 2;

                if (sim[0] == 0) {
                    sim[0] = [0, 0, 0, 0, 0];
                    sim[1] = [0, 0, 0, 0, 0];
                }

                let rr = ident_mat3;

                let t0 = -weight_angle * wweight_n / wrev_t_n + 0.13;
                let t1 = -weight_angle * wweight_n / wrev_t_n + 0.16;


                sim_reverse_gear(sim[0], t0, false);
                sim_reverse_gear(sim[1], t1, true);

                gl.begin(width, height);


                draw_complete_assembly(mat4_mul(vp, scale_mat4(0.8)), rot, 150, {
                    "Weight": blue_color,

                }, {},
                    {
                        "Weight_angle": weight_angle,
                        "show_date_ring": true,
                        "auto_params": reverse_sim_params(sim[0], sim[1])
                    }
                );
                ctx.drawImage(gl.finish(), 0, 0, width, height);


            } else if (mode === "reversing_wheel_assembly") {



                gl.begin(width, height);

                let mvp = mat4_mul(vp, mat4_mul(scale_mat4(4.1), translation_mat4([0, 0, smooth_step(1, 0.5, arg0) * 2])));

                draw_reverse_gear(mvp, rot, false, 0, 0, -0.02, 0.1, {
                    "Reversing_wheel_lever": dark_gray_color,
                    "Reversing_wheel_top": blue_color,
                    "Reversing_wheel_bottom": yellow_color,
                }, {
                    "Reversing_wheel_lever": smooth_step(0.5, 0, arg0) * -2,
                    "Reversing_wheel_top": smooth_step(1, 0.5, arg0) * -4,
                });

                ctx.drawImage(gl.finish(), 0, 0, width, height);


            } else if (mode === "reversing_wheel_interaction") {

                let top_angle = -arg0 * 4;

                sim_reverse_gear(sim, top_angle, false);

                gl.begin(width, height);

                let mvp = mat4_mul(vp, scale_mat4(6));

                draw_reverse_gear(mvp, rot, false, top_angle, sim[3], sim[1], sim[2], {
                    "Reversing_wheel_lever": dark_gray_color,
                    "Reversing_wheel_top": blue_color,
                    "Reversing_wheel_bottom": yellow_color,
                }, {}, true);

                ctx.drawImage(gl.finish(), 0, 0, width, height);



            } else if (mode === "automatic_behavior" || mode === "automatic_interaction") {


                if (sim[0] == 0) {
                    sim[0] = [0, 0, 0, 0, 0];
                    sim[1] = [0, 0, 0, 0, 0];
                }

                let weight_angle = arg0 * (mode === "automatic_interaction" ? 3 : 7);


                let t0 = -weight_angle * wweight_n / wrev_t_n + 0.13;
                let t1 = -weight_angle * wweight_n / wrev_t_n + 0.16;


                sim_reverse_gear(sim[0], t0, false);
                sim_reverse_gear(sim[1], t1, true);

                gl.begin(width, height);

                let colors = {
                    "Weight": blue_color,
                    "Automatic_gear1": orange_color,
                };

                let offsets = undefined;

                let mvp = vp;

                if (mode === "automatic_interaction") {
                    offsets = {
                        "skip_weight": 1,
                        "rev_cut": 1,
                        "Automatic_device_framework": 10000,
                        "Automatic_device_bridge": 10000,
                    }

                    let tt = 0.85;

                    colors = {
                        "Reversing_wheel_lever": vec_lerp(dark_gray_color, gray_color, (1 - sim[0][5]) * tt),
                        "Reversing_wheel_top": vec_lerp(blue_color, gray_color, (1 - sim[0][5]) * tt),
                        "Reversing_wheel_bottom": vec_lerp(yellow_color, gray_color, (1 - sim[0][5]) * tt),
                        "Reversing_wheel_lever_cw": vec_lerp(dark_gray_color, gray_color, (1 - sim[1][5]) * tt),
                        "Reversing_wheel_top_cw": vec_lerp(blue_color, gray_color, (1 - sim[1][5]) * tt),
                        "Reversing_wheel_bottom_cw": vec_lerp(yellow_color, gray_color, (1 - sim[1][5]) * tt),
                        "Weight": gray_color,
                        "Weight_gear": green_color,
                        "Automatic_gear0": red_color,
                        "Automatic_gear1": orange_color,
                    }

                    mvp = mat4_mul(vp, mat4_mul(scale_mat4(2), translation_mat4([-1.2, 2.5, 1.5])));
                }

                draw_automatic(mvp, rot, weight_angle, t0, t1, reverse_sim_params(sim[0], sim[1]), colors, offsets, true, true)

                if (!mode === "automatic_interaction") {
                    draw_automatic_jewels(mvp, rot, {

                    }, true);
                }
                ctx.drawImage(gl.finish(), 0, 0, width, height);

            } else if (mode === "automatic_assembly") {


                if (sim[0] == 0) {
                    sim[0] = [0, 0, 0, 0, 0];
                    sim[1] = [0, 0, 0, 0, 0];
                }

                let weight_angle = 0;
                let t0 = -weight_angle * wweight_n / wrev_t_n + 0.13;
                let t1 = -weight_angle * wweight_n / wrev_t_n + 0.16;


                sim_reverse_gear(sim[0], t0, false);
                sim_reverse_gear(sim[1], t1, true);

                gl.begin(width, height);



                let mvp = mat4_mul(vp, scale_mat4(0.9 + smooth_step(0.9, 1.0, arg0) * 0.1));
                draw_automatic(mvp, rot, weight_angle, t0, t1, reverse_sim_params(sim[0], sim[1]), {
                    "Reversing_wheel_lever": dark_gray_color,
                    "Reversing_wheel_top": blue_color,
                    "Reversing_wheel_bottom": yellow_color,
                    "Reversing_wheel_lever_cw": dark_gray_color,
                    "Reversing_wheel_top_cw": blue_color,
                    "Reversing_wheel_bottom_cw": yellow_color,
                    "Weight": blue_color,
                    "Weight_gear": green_color,
                    "Weight_screw": dark_gray_color,
                    "Automatic_device_bridge_screw": dark_gray_color,

                    "Automatic_gear0": red_color,
                    "Automatic_gear1": orange_color,

                }, {
                    "Automatic_device_framework_screw0": Infinity,
                    "Automatic_device_framework_screw1": Infinity,
                    "Reverse_gear0": smooth_step(1 / 8, 0 / 8, arg0) * 3,
                    "Reverse_gear1": smooth_step(2 / 8, 1 / 8, arg0) * 5,
                    "Automatic_gear1": smooth_step(3 / 8, 2 / 8, arg0) * 7,
                    "Automatic_gear0": smooth_step(4 / 8, 3 / 8, arg0) * 9,
                    "Automatic_device_bridge": smooth_step(5 / 8, 4 / 8, arg0) * 11,
                    "Automatic_device_bridge_screw": smooth_step(6 / 8, 5 / 8, arg0) * 12,
                    "Automatic_device_bridge_screw_a": smooth_step(6 / 8, 0.72, arg0) * 16,
                    "Weight": smooth_step(7 / 8, 6 / 8, arg0) * -6,
                    "Weight_screw": smooth_step(1, 7 / 8, arg0) * -9,
                    "Weight_screw_a": smooth_step(1, 0.95, arg0) * 8,
                })

                draw_automatic_jewels(mvp, rot, {
                    "Automatic_device_bridge": smooth_step(5 / 8, 4 / 8, arg0) * 11,

                }, true);
                ctx.drawImage(gl.finish(), 0, 0, width, height);

            } else if (mode === "credit_card_size") {

                let sc = Math.exp(-arg0 * 3);
                let watch_size = 25.96;
                let ss = 0.93421;
                ss /= watch_size;
                ss *= sc;
                ss *= width;

                let w = 85.6 * ss;
                let h = 53.98 * ss;
                let r = 3.18 * ss;


                gl.begin(width, height);
                draw_complete_assembly(mat4_mul(scale_mat4([sc, sc, 1]), vp), rot, 200, {}, {

                }, {

                    "show_date_ring": true,
                    "show_second_hand": true,
                    "show_minute_hand": true,
                    "show_hour_hand": true,
                });
                ctx.drawImage(gl.finish(), 0, 0, width, height);

                ctx.save();
                ctx.translate(width * 0.5 - w / 2, height * 0.5 - h / 2);

                ctx.strokeStyle = "#333";
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.roundRect(0, 0, w, h, r);
                ctx.stroke();

                ctx.beginPath();
                ctx.roundRect(9.5 * ss, 18.5 * ss, 11.2 * ss, 8.6 * ss, 2 * ss);
                ctx.stroke();

                ctx.restore();


                ctx.feather(width * scale, height * scale,
                    canvas.height * 0.08, canvas.height * 0.08,
                    canvas.height * 0.08, canvas.height * 0.08);

            }


            function draw_reverse_gear(mvp, rot, cw, top_angle, bottom_angle, lever0_angle, lever1_angle, colors, offsets, partial) {

                function offset(name) {
                    return offsets && offsets[name] ? offsets[name] : 0;
                }

                let ss = 0.48;


                let top_color = colors["Reversing_wheel_top"];
                let bottom_color = colors["Reversing_wheel_bottom"];
                let lever_color = colors["Reversing_wheel_lever"];

                if (cw) {
                    top_color = colors["Reversing_wheel_top_cw"];
                    bottom_color = colors["Reversing_wheel_bottom_cw"];
                    lever_color = colors["Reversing_wheel_lever_cw"];
                }

                let mm = mat4_mul(mat4_mul(mvp, scale_mat4([ss, ss, 1])), translation_mat4([0, 0, -13.2]));

                let lmm0 = mm;
                lmm0 = mat4_mul(lmm0, rot_z_mat4(top_angle));
                lmm0 = mat4_mul(lmm0, translation_mat4([2.65, 0, + offset("Reversing_wheel_lever")]));
                lmm0 = mat4_mul(lmm0, rot_z_mat4(lever0_angle));

                let lmm1 = mm;
                lmm1 = mat4_mul(lmm1, rot_z_mat4(top_angle + pi));
                lmm1 = mat4_mul(lmm1, translation_mat4([2.65, 0, + offset("Reversing_wheel_lever")]));
                lmm1 = mat4_mul(lmm1, rot_z_mat4(lever1_angle));


                if (cw) {
                    gl.draw_mesh("Reversing_wheel_lever", mat4_mul(lmm0, mat4_mul(rot_x_mat4(pi), translation_mat4([0, 0, -26.02]))),
                        mat3_mul(rot, mat3_mul(rot_z_mat3(top_angle + lever0_angle), rot_x_mat3(pi))),
                        lever_color);

                    gl.draw_mesh("Reversing_wheel_lever", mat4_mul(lmm1, mat4_mul(rot_x_mat4(pi), translation_mat4([0, 0, -26.02]))),
                        mat3_mul(rot, mat3_mul(rot_z_mat3(top_angle + lever1_angle), rot_x_mat3(pi))),
                        lever_color);
                } else {
                    gl.draw_mesh("Reversing_wheel_lever", lmm0, mat3_mul(rot, rot_z_mat3(top_angle + lever0_angle)),
                        lever_color);

                    gl.draw_mesh("Reversing_wheel_lever", lmm1, mat3_mul(rot, rot_z_mat3(top_angle + lever1_angle + pi)),
                        lever_color);
                }

                gl.draw_mesh("Cylinder", mat4_mul(lmm0, mat4_mul(translation_mat4([0, 0, 12.92]),
                    scale_mat4([0.41, 0.41, 0.15])
                )), mat3_mul(rot, rot_z_mat3(top_angle + lever0_angle)), lever_color);

                gl.draw_mesh("Cylinder", mat4_mul(lmm1, mat4_mul(translation_mat4([0, 0, 12.92]),
                    scale_mat4([0.41, 0.41, 0.15])
                )), mat3_mul(rot, rot_z_mat3(top_angle + lever1_angle + pi)), lever_color);


                if (partial) {
                    gl.draw_mesh("Reversing_wheel_cut", mat4_mul(mat4_mul(mm, translation_mat4([0, 0, offset("Reversing_wheel_top")])), rot_z_mat4(top_angle)),
                        mat3_mul(rot, rot_z_mat3(top_angle)),
                        top_color);
                } else {
                    gl.draw_mesh("Reversing_wheel_top", mat4_mul(mat4_mul(mm, translation_mat4([0, 0, offset("Reversing_wheel_top")])), rot_z_mat4(top_angle)),
                        mat3_mul(rot, rot_z_mat3(top_angle)),
                        top_color);

                }

                gl.draw_gear_teeth_mesh("wrev_t", mat4_mul(mvp, mat4_mul(rot_z_mat4(top_angle), translation_mat4([0, 0, -0.39 + offset("Reversing_wheel_top")]))),
                    mat3_mul(rot, rot_z_mat3(top_angle)),
                    top_color);


                gl.draw_gear_teeth_mesh("wrev_b", mat4_mul(mvp, mat4_mul(rot_z_mat4(bottom_angle), translation_mat4([0, 0, -0.1]))),
                    mat3_mul(rot, rot_z_mat3(bottom_angle)),
                    bottom_color);
                gl.draw_mesh("Reversing_wheel_bottom", mat4_mul(mm, rot_z_mat4(bottom_angle)), mat3_mul(rot, rot_z_mat3(bottom_angle)),
                    bottom_color);

                if (cw) {
                    gl.draw_gear_teeth_mesh("wrev_b0", mat4_mul(mvp, mat4_mul(rot_z_mat4(bottom_angle), translation_mat4([0, 0, 0.25]))),
                        mat3_mul(rot, rot_z_mat3(bottom_angle)),
                        bottom_color);
                } else {
                    gl.draw_mesh("Cylinder", mat4_mul(mvp, mat4_mul(translation_mat4([0, 0, 0.5]),
                        scale_mat4([1.3 * 0.5 * ss, 1.3 * 0.5 * ss, 0.5])
                    )), rot, bottom_color);
                }

                gl.draw_mesh("Cylinder", mat4_mul(mvp, mat4_mul(translation_mat4([0, 0, -0.3]),
                    scale_mat4([1.3 * 0.5 * ss, 1.3 * 0.5 * ss, 0.2])
                )), rot, bottom_color);

                gl.draw_mesh("Cylinder", mat4_mul(mvp, mat4_mul(translation_mat4([0, 0, -0.5]),
                    scale_mat4([0.1, 0.1, 0.2])
                )), rot, bottom_color);

                gl.draw_mesh("Cylinder", mat4_mul(mvp, mat4_mul(translation_mat4([0, 0, 0.7]),
                    scale_mat4([0.1, 0.1, 0.2])
                )), rot, bottom_color);
            }



            function draw_jewel(vp, rot, R, r, H, h, colored, up) {

                let color = colored ? jewel_color : neutral_jewel_color;
                R *= 0.5;
                r *= 0.5;

                if (h === undefined)
                    h = 0.5 * H;
                let params = [4 * r / R, (H - h + r) / (0.75 * R), h * 2 / H, 0.2];
                gl.draw_mesh("Jewel_bearing", mat4_mul(vp, mat4_mul(scale_mat4([R, R, H]), rot_x_mat4(up ? pi : 0))),
                    mat3_mul(rot, rot_x_mat3(up ? pi : 0)), color, 1, "jewel", params);

            }


            function draw_click(mvp, rot, angle, color) {

                angle += 0.62;

                mvp = mat4_mul(mvp, translation_mat4([-3.628, 6.7, -0.42 + 14]));
                mvp = mat4_mul(mvp, rot_z_mat4(angle));

                rot = mat3_mul(rot, rot_z_mat3(angle));

                gl.draw_mesh("Click", mvp, rot, color);

                gl.draw_mesh("Cylinder", mat4_mul(mvp, mat4_mul(translation_mat4([0, 0, -14 + 0.4]), scale_mat4([0.24, 0.24, 0.4]))), rot, color);

                gl.draw_mesh("Cylinder", mat4_mul(mvp, mat4_mul(translation_mat4([1.905, 0.2, -14 - 0.24]), scale_mat4([0.22, 0.22, 0.56]))), rot, color);
            }

            function draw_click_spring(mvp, rot, flex, color) {

                const angle = -0.803 + flex * 2.9;

                mvp = mat4_mul(mvp, translation_mat4([-0.68, 5.27, -0.42 + 15]));
                mvp = mat4_mul(mvp, rot_z_mat4(angle));

                rot = mat3_mul(rot, rot_z_mat3(angle));

                gl.draw_mesh("Click_spring", mvp, rot, color, 1, "click_spring", [flex, 0, 0, 0]);
            }


            function draw_automatic_jewels(mvp, rot, offsets, colored) {
                let off = offsets && offsets["Automatic_device_framework"] ? offsets["Automatic_device_framework"] : 0;

                draw_jewel(mat4_mul(mvp, translation_mat4([-3.2877, -3.1924, -2 + off])), rot, 0.75, 0.2, 0.25, undefined, colored, true);
                draw_jewel(mat4_mul(mvp, translation_mat4([0.75, -4.5186, -2 + off])), rot, 0.75, 0.2, 0.25, undefined, colored, true);
                draw_jewel(mat4_mul(mvp, translation_mat4([3.6, -4.09, -2 + off])), rot, 0.75, 0.2, 0.25, undefined, colored, true);

                off = offsets && offsets["Automatic_device_bridge"] ? offsets["Automatic_device_bridge"] : 0;


                draw_jewel(mat4_mul(mvp, translation_mat4([-3.2877, -3.1924, -1 + off])), rot, 0.75, 0.2, 0.25, undefined, colored);
                draw_jewel(mat4_mul(mvp, translation_mat4([0.75, -4.5186, -1 + off])), rot, 0.75, 0.2, 0.25, undefined, colored);
                draw_jewel(mat4_mul(mvp, translation_mat4([3.6, -4.09, -1 + off])), rot, 0.75, 0.2, 0.25, undefined, colored);
            }

            function draw_automatic(mvp, rot, weight_angle, t0, t1, p, colors, offsets, skip_screws, dot) {

                let b0 = p[0];
                let b1 = p[1];
                let rev0_l0 = p[2];
                let rev0_l1 = p[3];
                let rev1_l0 = p[4];
                let rev1_l1 = p[5];

                function offset(name) {
                    return offsets && offsets[name] ? offsets[name] : 0;
                }

                gl.draw_mesh("Automatic_device_framework", mat4_mul(mvp, translation_mat4([0, 0, offset("Automatic_device_framework")])), rot, colors["Automatic_device_framework"]);
                {
                    gl.draw_mesh("Cylinder", mat4_mul(mvp, mat4_mul(translation_mat4([2.4, -7, -0.7 + offset("Automatic_device_framework")]), scale_mat4([0.34, 0.34, 0.3]))), rot, colors["Automatic_device_framework"]);

                    gl.draw_mesh("Cylinder", mat4_mul(mvp, mat4_mul(translation_mat4([-5.2, -5.4, -0.7 + offset("Automatic_device_framework")]), scale_mat4([0.34, 0.34, 0.3]))), rot, colors["Automatic_device_framework"]);

                    gl.draw_mesh("Cylinder", mat4_mul(mvp, mat4_mul(translation_mat4([4.74, -1.08, -0.7 + offset("Automatic_device_framework")]), scale_mat4([0.15, 0.15, 1]))), rot, colors["Automatic_device_framework"]);
                }
                gl.draw_mesh("Automatic_device_bridge", mat4_mul(mvp, translation_mat4([0, 0, offset("Automatic_device_bridge")])), rot, colors["Automatic_device_bridge"]);

                if (!skip_screws) {
                    draw_screw(mvp, rot, colors["Automatic_device_bridge_screw"], false, [-2.0642, -6.3014, -0.73 + offset("Automatic_device_bridge_screw")], offset("Automatic_device_bridge_screw_a") + 3, 0.2, 0.6, 0.6, 0.18);

                    draw_screw(mvp, rot, colors["Automatic_device_framework_screw0"], true, [-3.08, 4.67, -2 + offset("Automatic_device_framework_screw0")], offset("Automatic_device_framework_screw0_a") + 3.4, 0.2, 0.6, 1, 0.18);

                    draw_screw(mvp, rot, colors["Automatic_device_framework_screw1"], true, [-0.7442, -7.3474, -1.5 + offset("Automatic_device_framework_screw1")], offset("Automatic_device_framework_screw1_a") + 9, 0.2, 0.6, 1, 0.18);

                }

                {
                    let m = mat4_mul(mat4_mul(mvp, translation_mat4([0, 0, offset("Weight")])), rot_z_mat4(weight_angle));
                    let r = mat3_mul(rot, rot_z_mat3(weight_angle));

                    if (!offset("skip_weight"))
                        gl.draw_mesh("Weight", m, r, colors["Weight"]);


                    gl.draw_gear_teeth_mesh("wweight", mat4_mul(m, translation_mat4([0, 0, -0.3 - 1.8])), r,
                        colors["Weight_gear"]);

                    gl.draw_mesh("Pinion_center", mat4_mul(mat4_mul(m, translation_mat4([0, 0, -1.9])), scale_mat4([2, 2, 0.4])), r, colors["Weight_gear"], 1, "axial_resize", [0.8, 0.6, 0.0, 1.0]);

                }

                if (!skip_screws)
                    draw_screw(mvp, rot, colors["Weight_screw"], true, [0, 0, -2.55 + offset("Weight_screw")], offset("Weight_screw_a") + 3, 0.32, 1.2, 1, 0.18);


                draw_reverse_gear(mat4_mul(mat4_mul(mvp, translation_mat4([0, 0, offset("Reverse_gear0")])), translation_mat4([-3.2877, -3.1924, -1.5])), rot, false, t0, b0, rev0_l0, rev0_l1, colors, offsets, offset("rev_cut"));
                draw_reverse_gear(mat4_mul(mat4_mul(mvp, translation_mat4([0, 0, offset("Reverse_gear1")])), translation_mat4([0.75, -4.5186, -1.5])), rot, true, t1, b1, rev1_l0, rev1_l1, colors, offsets, offset("rev_cut"));



                {
                    let color = colors["Automatic_gear0"];
                    let a = -b1 * wrev_b0_n / wauto01_n + 0.18;
                    let m = mat4_mul(mat4_mul(mvp, translation_mat4([0, 0, offset("Automatic_gear0")])), translation_mat4([3.6, -4.09, -1.54]));
                    m = mat4_mul(m, rot_z_mat4(a));

                    let r = mat3_mul(rot, rot_z_mat3(a));

                    gl.draw_gear_teeth_mesh("wauto00", m, r, color);

                    gl.draw_gear_teeth_mesh("wauto01", mat4_mul(m, translation_mat4([0, 0, 0.33])), r,
                        color);

                    gl.draw_mesh("Cylinder", mat4_mul(m, mat4_mul(translation_mat4([0, 0, 0.53]),
                        scale_mat4([0.2, 0.2, 0.16])
                    )), r, color);

                    gl.draw_mesh("Cylinder", mat4_mul(m, mat4_mul(translation_mat4([0, 0, 0.73]),
                        scale_mat4([0.1, 0.1, 0.2]))), r, color);


                    gl.draw_mesh("Cylinder", mat4_mul(m, mat4_mul(translation_mat4([0, 0, -0.3]),
                        scale_mat4([0.2, 0.2, 0.1])
                    )), r, color);

                    gl.draw_mesh("Cylinder", mat4_mul(m, mat4_mul(translation_mat4([0, 0, -0.4]),
                        scale_mat4([0.1, 0.1, 0.2]))), r, color);
                }


                {
                    let color = colors["Automatic_gear1"];
                    let a = b1 * wrev_b0_n / wauto01_n * wauto00_n / wauto11_n + 0.1;

                    let m = mat4_mul(mat4_mul(mvp, translation_mat4([0, 0, offset("Automatic_gear1")])), translation_mat4([4.74, -1.08, -1.3]));
                    m = mat4_mul(m, rot_z_mat4(a));

                    let r = mat3_mul(rot, rot_z_mat3(a));

                    gl.draw_gear_teeth_mesh("wauto10", m, r, color);

                    gl.draw_mesh("Pinion_center", mat4_mul(mat4_mul(m, translation_mat4([0, 0, 0.25])), scale_mat4([0.3, 0.3, 0.5])), r, color, 1, "axial_resize", [0.8, 0.15 * 2 / 0.3, 0.0, 1.0]);


                    gl.draw_gear_teeth_mesh("wauto11", mat4_mul(m, translation_mat4([0, 0, -0.31])), r,
                        color);

                    gl.draw_mesh("Pinion_center", mat4_mul(mat4_mul(m, translation_mat4([0, 0, 0.06 - 0.31])), scale_mat4([0.3, 0.3, 0.12])), r, color, 1, "axial_resize", [0.8, 0.15 * 2 / 0.3, 0.0, 1.0]);

                    if (dot) {
                        gl.draw_mesh("Cylinder", mat4_mul(mat4_mul(m, translation_mat4([0, 2.1, 0.1 - 0.31])), scale_mat4([0.2, 0.2, 0.2])), r, digit_color);
                    }
                }
            }


            function draw_barrel_arbor(mvp, rot, angle, color) {

                mvp = mat4_mul(mvp, translation_mat4([5.78, 2.89, -0.5]));
                mvp = mat4_mul(mvp, rot_z_mat4(angle));
                mvp = mat4_mul(mvp, rot_x_mat4(pi));

                rot = mat3_mul(rot, rot_z_mat3(angle));
                rot = mat3_mul(rot, rot_x_mat3(pi));

                gl.draw_mesh("Barrel_arbor", mat4_mul(mvp, translation_mat4([0, 0, 18.85])), rot, color);

            }

            function draw_screw(mvp, rot, color, flip, pos, angle, r, R, h, H = 0.2) {
                mvp = mat4_mul(mvp, translation_mat4(pos));
                mvp = mat4_mul(mvp, rot_z_mat4(-angle));

                rot = mat3_mul(rot, rot_z_mat3(-angle));

                if (flip) {
                    mvp = mat4_mul(mvp, rot_x_mat4(pi));
                    rot = mat3_mul(rot, rot_x_mat3(pi));
                }

                gl.draw_mesh("Screw_head", mat4_mul(mvp, scale_mat4([R * 2, R * 2, H / 0.2])), rot, color);

                gl.draw_mesh("Cylinder", mat4_mul(mvp, scale_mat4([r, r, h])), rot, color);
            }

            function draw_balance_bridge(mvp, rot, color) {
                gl.draw_mesh("Balance_bridge", mvp, rot, color);

                gl.draw_mesh("Cylinder", mat4_mul(mvp, mat4_mul(translation_mat4([-2.88, 10.87, + 0.51]), scale_mat4([0.39, 0.39, 0.5]))), rot, color);

                gl.draw_mesh("Cylinder", mat4_mul(mvp, mat4_mul(translation_mat4([-8.64, 7.17, + 0.51]), scale_mat4([0.39, 0.39, 0.5]))), rot, color);


            }

            function draw_first_wheel(mvp, rot, angle, cut, skip_lid, color) {

                const base_offset = -25;

                mvp = mat4_mul(mvp, translation_mat4([5.78, 2.89, -0.5]));
                mvp = mat4_mul(mvp, rot_z_mat4(angle));
                mvp = mat4_mul(mvp, rot_x_mat4(pi));

                rot = mat3_mul(rot, rot_z_mat3(angle));
                rot = mat3_mul(rot, rot_x_mat3(pi));

                if (cut)
                    gl.draw_mesh("Barrel_cut", mat4_mul(mvp, translation_mat4([0, 0, -base_offset])), rot, color);
                else
                    gl.draw_mesh("Barrel_main", mat4_mul(mvp, translation_mat4([0, 0, -base_offset])), rot, color);

                if (!skip_lid)
                    gl.draw_mesh("Barrel_lid", mat4_mul(mvp, translation_mat4([0, 0, -base_offset])), rot, color);

                gl.draw_gear_teeth_mesh("w11", mat4_mul(mvp, translation_mat4([0, 0, -0.45])), rot, color);
            }

            function draw_second_wheel(mvp, rot, angle, color) {

                const base_offset = 6.7;

                mvp = mat4_mul(mvp, translation_mat4([6.025, -4.137, 1.6]));
                mvp = mat4_mul(mvp, rot_z_mat4(angle));

                rot = mat3_mul(rot, rot_z_mat3(angle));

                gl.draw_mesh("Second_wheel", mat4_mul(mvp, translation_mat4([0, 0, base_offset])), rot, color);

                gl.draw_gear_teeth_mesh("w20", mat4_mul(mvp, translation_mat4([0, 0, -1.4])), rot, color);
                gl.draw_gear_teeth_mesh("w21", mat4_mul(mvp, translation_mat4([0, 0, -0.06])), rot, color);

                gl.draw_mesh("Cylinder", mat4_mul(mvp, mat4_mul(translation_mat4([0, 0, 0.28]),
                    scale_mat4([0.14, 0.14, 0.28])
                )), rot, color);

                gl.draw_mesh("Cylinder", mat4_mul(mvp, mat4_mul(translation_mat4([0, 0, -0.12]),
                    scale_mat4([0.65, 0.65, 0.86])
                )), rot, color);

                gl.draw_mesh("Cylinder", mat4_mul(mvp, mat4_mul(translation_mat4([0, 0, -1.83]),
                    scale_mat4([0.27, 0.27, 0.41])
                )), rot, color);

                gl.draw_mesh("Cylinder", mat4_mul(mvp, mat4_mul(translation_mat4([0, 0, -2.24]),
                    scale_mat4([0.14, 0.14, 0.4])
                )), rot, color);
            }

            function draw_third_wheel(mvp, rot, angle, color) {

                const base_offset = 16.9;

                mvp = mat4_mul(mvp, translation_mat4([2.489, -2.765, -0.62]));
                mvp = mat4_mul(mvp, rot_z_mat4(angle));
                mvp = mat4_mul(mvp, rot_x_mat4(pi));

                rot = mat3_mul(rot, rot_z_mat3(angle));
                rot = mat3_mul(rot, rot_x_mat3(pi));

                gl.draw_mesh("Third_wheel", mat4_mul(mvp, translation_mat4([0, 0, base_offset])), rot, color);


                gl.draw_gear_teeth_mesh("w30", mat4_mul(mvp, translation_mat4([0, 0, -1.95])), rot, color);
                gl.draw_gear_teeth_mesh("w31", mat4_mul(mvp, translation_mat4([0, 0, -0.05])), rot, color);


                gl.draw_mesh("Cylinder", mat4_mul(mvp, mat4_mul(translation_mat4([0, 0, 0.15]),
                    scale_mat4([0.12, 0.12, 0.15])
                )), rot, color);

                gl.draw_mesh("Cylinder", mat4_mul(mvp, mat4_mul(translation_mat4([0, 0, 0.45]),
                    scale_mat4([0.07, 0.07, 0.3])
                )), rot, color);

                gl.draw_mesh("Cylinder", mat4_mul(mvp, mat4_mul(translation_mat4([0, 0, -0.12]),
                    scale_mat4([0.31, 0.31, 1.5])
                )), rot, color);

                gl.draw_mesh("Cylinder", mat4_mul(mvp, mat4_mul(translation_mat4([0, 0, -2.25]),
                    scale_mat4([0.07, 0.07, 0.3])
                )), rot, color);
            }

            function draw_fourth_wheel(mvp, rot, angle, color) {

                const base_offset = 11.6;

                const offset_z = -0.8;

                mvp = mat4_mul(mvp, translation_mat4([0, 0, offset_z]));
                mvp = mat4_mul(mvp, rot_z_mat4(angle));
                mvp = mat4_mul(mvp, rot_x_mat4(pi));

                rot = mat3_mul(rot, rot_z_mat3(angle));
                rot = mat3_mul(rot, rot_x_mat3(pi));

                gl.draw_mesh("Fourth_wheel", mat4_mul(mvp, translation_mat4([0, 0, base_offset])), rot, color);

                gl.draw_gear_teeth_mesh("w40", mat4_mul(mvp, translation_mat4([0, 0, -0.35])), rot, color);
                gl.draw_gear_teeth_mesh("w41", mat4_mul(mvp, translation_mat4([0, 0, -0.06])), rot, color);


                gl.draw_mesh("Cylinder", mat4_mul(mvp, mat4_mul(translation_mat4([0, 0, 0.3]),
                    scale_mat4([0.07, 0.07, 0.3])
                )), rot, color);

                gl.draw_mesh("Cylinder", mat4_mul(mvp, mat4_mul(translation_mat4([0, 0, -0.63]),
                    scale_mat4([0.17, 0.17, 0.67])
                )), rot, color);

                gl.draw_mesh("Cylinder", mat4_mul(mvp, mat4_mul(translation_mat4([0, 0, -1.3]),
                    scale_mat4([0.3, 0.3, 0.1])
                )), rot, color);

                gl.draw_mesh("Cylinder", mat4_mul(mvp, mat4_mul(translation_mat4([0, 0, -1.4]), scale_mat4([0.17, 0.17, 2.05])
                )), rot, color);

                gl.draw_mesh("Cylinder", mat4_mul(mvp, mat4_mul(translation_mat4([0, 0, -3.45]),
                    scale_mat4([0.07, 0.07, 1.18])
                )), rot, color);
            }

            function draw_escape_wheel(mvp, rot, angle, color) {


                mvp = mat4_mul(mvp, translation_mat4([-2.072, -3.03, 0.95]));
                mvp = mat4_mul(mvp, rot_z_mat4(angle));


                rot = mat3_mul(rot, rot_z_mat3(angle));

                gl.draw_mesh("Escape_wheel", mat4_mul(mvp, translation_mat4([-7.68, -4.985, 36.44])), rot, color);

                gl.draw_mesh("Cylinder", mat4_mul(mvp, mat4_mul(translation_mat4([0, 0, 0.22]),
                    scale_mat4([0.19 * 0.5, 0.19 * 0.5, 0.3])
                )), rot, color);

                gl.draw_mesh("Cylinder", mat4_mul(mvp, mat4_mul(translation_mat4([0, 0, -0.2]),
                    scale_mat4([1.0 * 0.5, 1.0 * 0.5, 0.3])
                )), rot, color);

                gl.draw_mesh("Cylinder", mat4_mul(mvp, mat4_mul(translation_mat4([0, 0, -0.5]),
                    scale_mat4([0.14, 0.14, 0.9])
                )), rot, color);

                gl.draw_mesh("Cylinder", mat4_mul(mvp, mat4_mul(translation_mat4([0, 0, -1.8]),
                    scale_mat4([0.07, 0.07, 0.3])
                )), rot, color);

                gl.draw_gear_teeth_mesh("w50", mat4_mul(mvp, translation_mat4([0, 0, -1.6])), rot, color);

            }


            function draw_shock(mvp, rot, color) {


                gl.draw_mesh("Shock_base", mvp, rot, color);
                gl.draw_mesh("Shock_center", mvp, rot, color);

                let spring_a = pi * (5 / 3) - 2 * pi / 3;
                gl.draw_mesh("Shock_spring", mat4_mul(mat4_mul(mvp, rot_z_mat4(spring_a)), translation_mat4([0, 0, -0.12 + 0.09])), mat3_mul(rot, rot_z_mat3(spring_a)), color, 1, "shock_spring", [-3, -2, 0.07, 0]);
            }


            function draw_hairspring(mvp, rot, corrected_balance_angle, z, color) {
                let l = 80;
                let a = 12.9 * pi * 2;
                let da = corrected_balance_angle;

                a += da;

                let RR = 2 * l / (a * Math.sqrt(1 + a * a) + Math.log(a + Math.sqrt(1 + a * a)));


                let m = mvp;
                m = mat4_mul(m, translation_mat4([-6.54, 0.3751, -0.25]));
                m = mat4_mul(m, scale_mat4([1, 1, 0.5 * 0.26]));
                m = mat4_mul(m, rot_z_mat4(da + 2));

                let r = rot;

                r = mat3_mul(r, rot_z_mat3(da + 2));

                gl.draw_spring(m, r, color, "hairspring", [a, 0.51, RR, 0.01, z, 0,
                    a - 2.2, a - 1.5, 3]);

            }


            function draw_regulator(mvp, rot, colors, offsets) {

                function offset(name) {
                    return offsets && offsets[name] ? offsets[name] : 0;
                }

                mvp = mat4_mul(mvp, translation_mat4([-6.54, 0.3751, -0.83]));



                {
                    let angle = -2.1 + offset("Stud_base_angle");

                    let m = mvp;
                    m = mat4_mul(m, rot_z_mat4(angle));
                    m = mat4_mul(m, translation_mat4([15.5304 + offset("Stud_base"), -94.3227, 3.64 + 0.2]));

                    let r = rot
                    r = mat3_mul(rot, rot_z_mat3(angle));

                    gl.draw_mesh("Stud_base", m, r, colors["Stud_base"]);

                    m = mvp;
                    m = mat4_mul(m, rot_z_mat4(angle));
                    m = mat4_mul(m, translation_mat4([3, 0, -0.15]));
                    m = mat4_mul(m, rot_z_mat4(pi / 2));
                    m = mat4_mul(m, translation_mat4([10.7016, -94.3227, 3.64 + 0.18]));

                    r = rot;
                    r = mat3_mul(rot, rot_z_mat3(angle + pi / 2));

                    gl.draw_mesh("Stud", m, r, colors["Stud"]);
                }

                {
                    let angle = 2 + offset("Index_angle");

                    let m = mvp;
                    m = mat4_mul(m, rot_z_mat4(angle));
                    m = mat4_mul(m, translation_mat4([20.168 + offset("Lower_index"), -94.3227, 3.64 + 0.05]));

                    let r = rot
                    r = mat3_mul(rot, rot_z_mat3(angle));

                    gl.draw_mesh("Lower_index", m, r, colors["Lower_index"]);

                    m = mvp;
                    m = mat4_mul(m, rot_z_mat4(angle + pi));
                    m = mat4_mul(m, translation_mat4([3, 0, -0.27]));
                    m = mat4_mul(m, rot_z_mat4(pi / 2));
                    m = mat4_mul(m, translation_mat4([10.7016, -94.3227, 3.64 + 0.16]));

                    r = rot;
                    r = mat3_mul(rot, rot_z_mat3(angle + pi + pi / 2));

                    gl.draw_mesh("Stud", m, r, colors["Index_stud"]);
                }



                {
                    let angle = 4.685;

                    let m = mvp;
                    m = mat4_mul(m, translation_mat4([0, 0, -0.24]));
                    m = mat4_mul(m, rot_z_mat4(2));
                    m = mat4_mul(m, translation_mat4([offset("Lower_index"), 0, offset("Upper_index")]));

                    m = mat4_mul(m, rot_z_mat4(angle - 2));

                    m = mat4_mul(m, rot_x_mat4(pi));
                    m = mat4_mul(m, translation_mat4([27.1766, -94.3227, 3.64]));

                    let r = rot
                    r = mat3_mul(r, rot_z_mat3(angle));
                    r = mat3_mul(r, rot_x_mat3(pi));

                    gl.draw_mesh("Upper_index", m, r, colors["Upper_index"]);



                }
            }



            function draw_pallet_fork(mvp, rot, angle, color, horn_color) {
                angle += (-37.2587) * pi / 180;

                let mm = mvp;

                let rr = rot;

                mvp = mat4_mul(mvp, translation_mat4([-4.305, -1.325, 0.6]));
                mvp = mat4_mul(mvp, rot_z_mat4(angle));
                mvp = mat4_mul(mvp, rot_x_mat4(pi));

                mvp = mat4_mul(mvp, translation_mat4([-0.975, -6.3, 35.6]));

                rot = mat3_mul(rot, rot_z_mat3(angle));
                rot = mat3_mul(rot, rot_x_mat3(pi));

                gl.draw_mesh("Pallet_fork", mvp, rot, color);
                gl.draw_mesh("Pallet_fork_horn", mvp, rot, horn_color ? horn_color : color);

                {
                    let m = mm;

                    m = mat4_mul(m, translation_mat4([-4.305, -1.325, 0.64]));
                    m = mat4_mul(m, scale_mat4([0.05, 0.05, 0.2]));

                    gl.draw_mesh("Cylinder", m, rr, color);
                }

                {
                    let m = mm;

                    m = mat4_mul(m, translation_mat4([-4.305, -1.325, 0.74]));
                    m = mat4_mul(m, scale_mat4([0.15, 0.15, 0.1]));

                    gl.draw_mesh("Cylinder", m, rr, color);
                }

                {
                    let m = mm;

                    m = mat4_mul(m, translation_mat4([-4.305, -1.325, 0.91 + 0.64]));
                    m = mat4_mul(m, scale_mat4([0.15, 0.15, 0.64]));

                    gl.draw_mesh("Cylinder", m, rr, color);
                }

                {
                    let m = mm;

                    m = mat4_mul(m, translation_mat4([-4.305, -1.325, 0.91 + 0.84]));
                    m = mat4_mul(m, scale_mat4([0.05, 0.05, 0.2]));

                    gl.draw_mesh("Cylinder", m, rr, color);
                }
            }

            function draw_pallet_fork_jewels(mvp, rot, angle, colored) {

                angle += (-37.2587) * pi / 180;

                mvp = mat4_mul(mvp, translation_mat4([-4.305, -1.325, 0.6]));
                mvp = mat4_mul(mvp, rot_z_mat4(angle));
                mvp = mat4_mul(mvp, rot_x_mat4(pi));

                mvp = mat4_mul(mvp, translation_mat4([-0.975, -6.3, 35.6 + 0.8]));

                rot = mat3_mul(rot, rot_z_mat3(angle));
                rot = mat3_mul(rot, rot_x_mat3(pi));

                gl.draw_mesh("Pallet_jewel_1", mvp, rot, colored ? jewel_color : neutral_jewel_color, 1, "jewel");
                gl.draw_mesh("Pallet_jewel_2", mvp, rot, colored ? jewel_color : neutral_jewel_color, 1, "jewel");
            }


            function draw_balance_wheel(mvp, rot, angle, color, safety_color) {

                angle += (-37.2587) * pi / 180;

                mvp = mat4_mul(mvp, translation_mat4([0, 0, 0.4]));

                let m = mvp;
                m = mat4_mul(m, translation_mat4([-6.54, 0.3751, 0]));
                m = mat4_mul(m, rot_z_mat4(angle));
                m = mat4_mul(m, rot_x_mat4(pi));
                m = mat4_mul(m, translation_mat4([18.77, -2.445, 36.64]));

                let r = rot;
                r = mat3_mul(r, rot_z_mat3(angle));
                r = mat3_mul(r, rot_x_mat3(pi));

                gl.draw_mesh("Balance_wheel", m, r, color);

                // top

                {
                    let m = mvp;

                    m = mat4_mul(m, translation_mat4([-6.54, 0.3751, -0.2]));
                    m = mat4_mul(m, scale_mat4([0.4, 0.4, 0.1]));

                    gl.draw_mesh("Cylinder", m, rot, color);
                }

                {
                    let m = mvp;

                    m = mat4_mul(m, translation_mat4([-6.54, 0.3751, -0.3]));
                    m = mat4_mul(m, scale_mat4([0.25, 0.25, 0.2]));

                    gl.draw_mesh("Cylinder", m, rot, color);
                }

                {
                    let m = mvp;

                    m = mat4_mul(m, translation_mat4([-6.54, 0.3751, -1.1]));
                    m = mat4_mul(m, scale_mat4([1, 1, 1.5]));
                    m = mat4_mul(m, rot_z_mat4(angle));
                    m = mat4_mul(m, translation_mat4([18.77, -2.445, 36.64]));

                    let r = rot;
                    r = mat3_mul(r, rot_z_mat3(angle));

                    gl.draw_mesh("Balance_spring_base", m, r, color);
                }

                {
                    let m = mvp;

                    m = mat4_mul(m, translation_mat4([-6.54, 0.3751, -0.8]));
                    m = mat4_mul(m, scale_mat4([0.25, 0.25, 0.1]));

                    gl.draw_mesh("Cylinder", m, rot, color);
                }

                {
                    let m = mvp;

                    m = mat4_mul(m, translation_mat4([-6.54, 0.3751, -0.9]));
                    m = mat4_mul(m, rot_x_mat4(pi));
                    m = mat4_mul(m, translation_mat4([28.3933, 0, 36.64]));

                    let r = rot;
                    r = mat3_mul(r, rot_x_mat3(pi));


                    gl.draw_mesh("Balance_shaft_end", m, r, color);
                }


                // bottom

                {
                    let m = mvp;

                    m = mat4_mul(m, translation_mat4([-6.54, 0.3751, 0.1]));
                    m = mat4_mul(m, scale_mat4([0.79, 0.79, 0.1]));

                    gl.draw_mesh("Cylinder", m, rot, color);
                }

                {
                    let m = mvp;

                    m = mat4_mul(m, translation_mat4([-6.54, 0.3751, 0.2]));
                    m = mat4_mul(m, scale_mat4([0.89, 0.89, 0.1]));

                    gl.draw_mesh("Cylinder", m, rot, color);
                }

                {
                    let m = mvp;

                    m = mat4_mul(m, translation_mat4([-6.54, 0.3751, 0.65]));
                    m = mat4_mul(m, scale_mat4([0.2, 0.2, 0.45]));

                    gl.draw_mesh("Cylinder", m, rot, color);
                }

                {
                    let m = mvp;

                    m = mat4_mul(m, translation_mat4([-6.54, 0.3751, 0.65]));
                    m = mat4_mul(m, rot_z_mat4(angle - pi / 2));
                    m = mat4_mul(m, translation_mat4([18.77, -2.445, 27.64]));

                    let r = rot;
                    r = mat3_mul(r, rot_z_mat3(angle - pi / 2));

                    gl.draw_mesh("Balance_safety", m, r, safety_color ? safety_color : color);
                }

                {
                    let m = mvp;

                    m = mat4_mul(m, translation_mat4([-6.54, 0.3751, 0.8]));
                    m = mat4_mul(m, translation_mat4([28.3933, 0, 36.64]));

                    gl.draw_mesh("Balance_shaft_end", m, rot, color);
                }
            }

            function draw_balance_wheel_jewel(mvp, rot, angle, colored) {

                angle += (-37.2587) * pi / 180;

                mvp = mat4_mul(mvp, translation_mat4([0, 0, 0.4]));


                let m = mvp;

                let sc = 0.315;
                m = mat4_mul(m, translation_mat4([-6.54, 0.3751, 0]));
                m = mat4_mul(m, rot_z_mat4(angle));
                m = mat4_mul(m, translation_mat4([0.6, 0, 0.2 + 0.35]));
                m = mat4_mul(m, scale_mat4([sc, sc, 0.35]));
                m = mat4_mul(m, translation_mat4([0, -20, 35.74]));

                gl.draw_mesh("Balance_jewel", m, rot, colored ? jewel_color : neutral_jewel_color, 1, "jewel", [1, 1, 1, 1]);
            }



            function draw_stop_lever(mvp, rot, sliding_offset, color) {

                let angle = sliding_offset * 0.4 - 1.17;

                angle = Math.max(angle, -1.4412);
                const base_offset = 30;

                mvp = mat4_mul(mvp, translation_mat4([-3.179, 8.635, 0.15 + base_offset]));
                mvp = mat4_mul(mvp, rot_z_mat4(angle));

                rot = mat3_mul(rot, rot_z_mat3(angle));

                gl.draw_mesh("Stop_lever", mat4_mul(mvp, translation_mat4([0, 0, 0])), rot, color);
            }


            function draw_crown_turn_arrows(mvp, rot) {
                {

                    let m = rot_x_mat4(pi * 0.5);
                    m = mat4_mul(scale_mat4(0.5), m);
                    m = mat4_mul(rot_y_mat4(pi * 0.75), m);
                    m = mat4_mul(translation_mat4([0, 15.5, 0]), m);

                    let r = rot_x_mat3(pi * 0.5);
                    r = mat3_mul(rot_y_mat3(pi * 0.75), r);
                    gl.draw_mesh("Arrow_curve", mat4_mul(mvp, m), mat3_mul(rot, r), crown_turn_arrow_color);
                }

                {
                    let m = rot_x_mat4(-pi * 0.5);
                    m = mat4_mul(scale_mat4(0.5), m);
                    m = mat4_mul(rot_y_mat4(pi * 0.25), m);
                    m = mat4_mul(translation_mat4([0, 15.5 - 0.5, 0]), m);

                    let r = rot_x_mat3(-pi * 0.5);
                    r = mat3_mul(rot_y_mat3(pi * 0.25), r);
                    gl.draw_mesh("Arrow_curve", mat4_mul(mvp, m), mat3_mul(rot, r), crown_turn_arrow_color);
                }
            }

            function draw_crown_pull_arrows(mvp, rot) {
                {

                    let m = scale_mat4(0.5);
                    m = mat4_mul(translation_mat4([-0.5, 19.5, 0.5]), m);

                    let r = ident_mat3;
                    gl.draw_mesh("Arrow", mat4_mul(mvp, m), mat3_mul(rot, r), crown_pull_arrow_color);
                }

                {
                    let m = scale_mat4(0.5);
                    m = mat4_mul(rot_z_mat4(pi), m);
                    m = mat4_mul(translation_mat4([0.5, 16.5, 0.5]), m);

                    let r = rot_z_mat3(pi);

                    gl.draw_mesh("Arrow", mat4_mul(mvp, m), mat3_mul(rot, r), crown_pull_arrow_color);
                }
            }

            function draw_complete_assembly(mvp, rot, step, colors = {}, offsets = {}, params = {}) {

                function offset(name) {
                    return offsets[name] ? offsets[name] : 0;
                }

                let stem_offset = params && params["stem_offset"] ? params["stem_offset"] : 0;
                let yoke_angle;
                let sliding_offset;

                if (params && params["yoke_angle"] !== undefined)
                    yoke_angle = params["yoke_angle"]
                else
                    yoke_angle = yoke_angle_(stem_offset);

                if (params && params["sliding_offset"] !== undefined)
                    sliding_offset = params["sliding_offset"]
                else
                    sliding_offset = yoke_angle * 5.65 + 0.12 * 5.65;


                let escape_angle = params && params["escape"] ? params["escape"] : 0.02;
                let crown_angle = params && params["crown"] ? params["crown"] : 0;
                let winding_angle = params && params["winding"] !== undefined ? params["winding"] : crown_angle;

                let arbor_angle;
                let click_angle;
                let setting_wheel_angle = 0;
                let fork_angle;
                let corrected_balance_angle = 0;

                if (params && params["arbor"] !== undefined) {
                    arbor_angle = params["arbor"]
                } else {
                    arbor_angle = -winding_angle * 2 * wwin_n / wrat_n + 0.105;
                }


                if (params && params["setting_wheel"] !== undefined) {
                    setting_wheel_angle = params["setting_wheel"]
                } else if ((params && params["mode"] === mode_time_set)) {
                    setting_wheel_angle = -crown_angle * wsliding_n / ws_n + 0.22;
                } else if ((params && params["mode"] === mode_date_set)) {
                    setting_wheel_angle = -crown_angle * wsliding_n / ws_n - 0.04;
                } else if ((params && params["mode"] === mode_crown_pull)) {
                    setting_wheel_angle = -crown_angle * wsliding_n / ws_n + sliding_offset * 0.4;
                }


                if (params && params["click"] !== undefined) {
                    click_angle = params["click"]
                } else {
                    let t = arbor_angle * wrat_n * 0.25 / pi;

                    t += 0.23;
                    t = t % 1;


                    let a = 0;

                    a += sharp_step(0.11, 0.28, t) * 0.11;
                    a += sharp_step(0.28, 0.55, t) * 0.086;
                    a += sharp_step(0.55, 0.7, t) * 0.03;
                    a -= sharp_step(0.8, 0.97, t) * 0.04;
                    a -= sharp_step(0.97, 0.995, t) * 0.02;
                    a -= sharp_step(0.995, 1, t) * 0.116;


                    click_angle = a;
                }

                let click_spring_flex;

                if (params && params["click_spring"] !== undefined)
                    click_spring_flex = params["click_spring"];
                else
                    click_spring_flex = -0.003;
                click_spring_flex -= sharp_step(-0.01, 0.22, click_angle) * 0.036;
                click_spring_flex -= sharp_step(0.22, 0.25, click_angle) * 0.003;
                click_spring_flex -= sharp_step(0.25, 0.3, click_angle) * 0.006;
                click_spring_flex -= sharp_step(0.3, 0.44, click_angle) * 0.013;
                // -click_angle * 0.137;


                if (params && params["fork_angle"] !== undefined)
                    fork_angle = params["fork_angle"];
                else
                    fork_angle = 0;

                if (params["balance_time"] !== undefined) {
                    let p = balance_params(params["balance_time"]);
                    escape_angle = p[0];
                    fork_angle = p[1];
                    corrected_balance_angle = p[2] * (params["balance_amp_scale"] ? params["balance_amp_scale"] : 1);
                }


                let intermediate_angle = escape_angle * w50_n / w41_n * w40_n / w31_n * w30_n / wc0_n * wc1_n / wi0_n + 0.0289;


                if (params && params["mode"] === mode_time_set) {
                    intermediate_angle = -setting_wheel_angle * ws_n / wi0_n + 0.22;

                } else if (params && params["mode"] === mode_crown_pull) {
                    intermediate_angle = 0.28 + sharp_step(0.61, 0.64, stem_offset) * 0.04;
                }

                let hour_angle = -intermediate_angle * wi1_n / wh0_n + 0.02;
                let minute_angle = hour_angle * 12;

                if (params["time_set_only_minutes"]) {
                    hour_angle = 5;
                }


                let date_indicator_offset = - 7.07;

                let date_indicator_gear_angle = hour_angle * 0.5 - 0.085 + date_indicator_offset;


                let indicator_t = (-date_indicator_gear_angle / (2 * pi)) % 1;

                let date_ring_angle = Math.floor(-date_indicator_gear_angle / (2 * pi)) * (-2 * pi / 31) - sharp_step(0.12, 0.14, indicator_t) * 0.028;
                date_ring_angle -= sharp_step(0.14, 0.1407, indicator_t) * (2 * pi / 31 - 0.028);

                let date_corrector_angle = 0;
                let date_corrector_offset = 0;


                if (params && params["date_ring_angle"])
                    date_ring_angle = params["date_ring_angle"];

                if (params && params["date_corrector_angle"])
                    date_corrector_angle = params["date_corrector_angle"];

                if (params && params["date_corrector_offset"])
                    date_corrector_offset = params["date_corrector_offset"]

                // if (params && params)

                let indicator_flex = sharp_step(0, 0.12, indicator_t) * pi / 4.3;
                indicator_flex -= sharp_step(0.14, 0.1407, indicator_t) * pi / 4.3;


                function draw_mainplate(mvp, rot, color) {
                    gl.draw_mesh("Mainplate", mvp, rot, color);

                    gl.draw_mesh("Cylinder", mat4_mul(mvp, mat4_mul(translation_mat4([-6.7, -3.375, 1.0]),
                        scale_mat4([0.43, 0.43, 0.5])
                    )), rot, color);

                    gl.draw_mesh("Cylinder", mat4_mul(mvp, mat4_mul(translation_mat4([-5.065, 1.585, 1.0]),
                        scale_mat4([0.43, 0.43, 0.5])
                    )), rot, color);


                    gl.draw_mesh("Cylinder", mat4_mul(mvp, mat4_mul(translation_mat4([-3.179, 8.635, 0.205]),
                        scale_mat4([0.22, 0.22, 0.2])
                    )), rot, color);

                    gl.draw_mesh("Cylinder", mat4_mul(mvp, mat4_mul(translation_mat4([-1.9544, 8.86, 0.205]),
                        scale_mat4([0.285, 0.285, 0.2])
                    )), rot, color);

                    gl.draw_mesh("Cylinder", mat4_mul(mvp, mat4_mul(translation_mat4([-0.286, -4.17, 1.96]),
                        scale_mat4([0.19, 0.19, 0.36])
                    )), rot, color);

                    gl.draw_mesh("Cylinder", mat4_mul(mvp, mat4_mul(translation_mat4([-0.504, -7.21, 2.07]),
                        scale_mat4([0.295, 0.295, 0.37])
                    )), rot, color);

                    gl.draw_mesh("Cylinder", mat4_mul(mvp, mat4_mul(translation_mat4([-0.79, 3.525, 2.07]),
                        scale_mat4([0.2, 0.2, 0.72])
                    )), rot, color);

                    gl.draw_mesh("Cylinder", mat4_mul(mvp, mat4_mul(translation_mat4([-5.71, 9.225, 1.53]),
                        scale_mat4([0.37, 0.37, 0.63])
                    )), rot, color);

                    gl.draw_mesh("Cylinder", mat4_mul(mvp, mat4_mul(translation_mat4([-1.9544, 8.86, 0.86]),
                        scale_mat4([0.285, 0.285, 0.22])
                    )), rot, color);


                    let m = mat4_mul(mvp, translation_mat4([-6.54, 0.3751, 11.4]));
                    m = mat4_mul(m, rot_x_mat4(pi));

                    draw_shock(m, mat3_mul(rot, rot_x_mat3(pi)), color);
                }

                if (step >= 0) {
                    draw_mainplate(mat4_mul(mvp, translation_mat4([0, 0, offset("Mainplate")])), rot, colors["Mainplate"]);

                }

                if (step >= 3) {

                    draw_pallet_fork(mat4_mul(mvp, translation_mat4([0, 0, offset("Pallet_fork")])), rot, fork_angle, colors["Pallet_fork"]);

                    draw_escape_wheel(mat4_mul(mvp, translation_mat4([0, 0, offset("Escape")])), rot, escape_angle, colors["Escape"]);

                }

                if (step >= 5) {


                    gl.draw_mesh("Pallet_bridge", mat4_mul(mvp, translation_mat4([0, 0, offset("Pallet_bridge")])), rot, colors["Pallet_bridge"]);

                    if (!params["skip_screws"]) {
                        draw_screw(mvp, rot, colors["Pallet_bridge_screw"], true, [-7.15, -1.89, 0.5 + offset("Pallet_bridge_screw")], offset("Pallet_bridge_screw_a"), 0.32, 0.6, 1, 0.18);

                        draw_screw(mvp, rot, colors["Pallet_bridge_screw"], true, [-4.965, 2.978, 0.5 + offset("Pallet_bridge_screw")], offset("Pallet_bridge_screw_a") + 2, 0.32, 0.6, 1, 0.18);
                    }
                }



                if (step >= 10) {
                    draw_first_wheel(mat4_mul(mvp, translation_mat4([0, 0, offset("First")])), rot, escape_angle * w50_n / w41_n * w40_n / w31_n * w30_n / w21_n * w20_n / w11_n + 0.002,
                        offsets["Cut_barrel"], false,
                        colors["First"]);
                    draw_second_wheel(mat4_mul(mvp, translation_mat4([0, 0, offset("Second")])), rot, -escape_angle * w50_n / w41_n * w40_n / w31_n * w30_n / w21_n + 0.0495, colors["Second"]);
                    draw_third_wheel(mat4_mul(mvp, translation_mat4([0, 0, offset("Third")])), rot, escape_angle * w50_n / w41_n * w40_n / w31_n + 0.041, colors["Third"]);
                    draw_fourth_wheel(mat4_mul(mvp, translation_mat4([0, 0, offset("Fourth")])), rot, -escape_angle * w50_n / w41_n + 0.5, colors["Fourth"]);

                    draw_barrel_arbor(mat4_mul(mvp, translation_mat4([0, 0, offset("First")])), rot, arbor_angle, colors["Barrel_arbor"]);

                    if (offsets["Main_spring"] !== undefined) {
                        let m = mat4_mul(mat4_mul(mvp, translation_mat4([5.78, 2.89, 0.45])), mat4_mul(rot_z_mat4(offsets["Main_spring"]), rot_x_mat4(pi)));
                        let r = mat3_mul(rot, mat3_mul(rot_z_mat3(offsets["Main_spring"]), rot_x_mat3(pi)));


                        gl.draw_mesh("Mainspring_base", mat4_mul(m, translation_mat4([0, 0, 18.85 + 0.93])), r, colors["Main_spring"]);

                        gl.draw_mainspring(mat4_mul(m, mat4_mul(scale_mat4([1, 1, 0.5]), rot_z_mat4(base_spring_angle))),
                            mat3_mul(r, rot_z_mat3(base_spring_angle)),
                            colors["Main_spring"]);

                        gl.draw_mainspring(mat4_mul(m, mat4_mul(mat4_mul(translation_mat4([0, 0, 0, -0.4]), scale_mat4([1, 1, 0.5])),
                            rot_z_mat4(base_spring_angle))), mat3_mul(r, rot_z_mat3(base_spring_angle)), gray_color, true);
                    }
                }

                if (step >= 13) {

                    gl.draw_mesh("Train_bridge", mat4_mul(mvp, translation_mat4([0, 0, offset("Train_bridge")])), rot, colors["Train_bridge"]);

                    gl.draw_mesh("Cylinder", mat4_mul(mvp, mat4_mul(translation_mat4([-4.37, -6.65, offset("Train_bridge") + 0.5]), scale_mat4([0.39, 0.39, 0.5]))), rot, colors["Train_bridge"]);


                    gl.draw_mesh("Cylinder", mat4_mul(mvp, mat4_mul(translation_mat4([9.78, -6.1593, offset("Train_bridge") + 0.5]), scale_mat4([0.39, 0.39, 0.5]))), rot, colors["Train_bridge"]);

                    if (!params["skip_screws"]) {

                        draw_screw(mvp, rot, colors["Train_bridge_screw"], true, [4.67, -8.155, -0.4 + offset("Train_bridge_screw")], offset("Train_bridge_screw_a"), 0.32, 0.6, 1, 0.18)

                        draw_screw(mvp, rot, colors["Train_bridge_screw"], true, [-6.105, -7.055, -0.4 + offset("Train_bridge_screw")], offset("Train_bridge_screw_a") + 1, 0.32, 0.6, 1.2, 0.18)
                    }
                }

                if (step >= 16) {

                    let mm = mvp;

                    mm = mat4_mul(mvp, translation_mat4([offset("Balance_assembly_x"), offset("Balance_assembly_y"), offset("Balance_assembly_z")]));
                    mm = mat4_mul(mm, rot_y_mat4(offset("Balance_assembly_rot")));

                    draw_balance_wheel(mat4_mul(mm, translation_mat4([0, 0, offset("Balance_wheel")])), rot, corrected_balance_angle, colors["Balance_wheel"]);



                    draw_balance_bridge(mat4_mul(mm, translation_mat4([0, 0, offset("Balance_bridge")])), rot, colors["Balance_bridge"]);

                    draw_screw(mat4_mul(mm, translation_mat4([0, 0, offset("Balance_bridge")])), rot, colors["Balance_bridge"], true, [-6.4183, 4.8659, -0.85], 0, 0.25, 0.6, 0.4);

                    draw_regulator(mm, rot, colors, offsets);
                    draw_hairspring(mat4_mul(mm, translation_mat4([0, 0, offset("Hairspring_z") * 1.2])), rot, corrected_balance_angle, offset("Hairspring_hang"), colors["Hairspring"]);



                    draw_shock(mat4_mul(mm, translation_mat4([-6.54, 0.3751, -10.5])), rot, undefined, offsets);

                    if (!params["skip_screws"]) {

                        draw_screw(mvp, rot, colors["Balance_screw"], true, [-6.315, 8.12, -0.46 + offset("Balance_screw")], offset("Balance_screw_a") + 4, 0.32, 0.6, 1.2, 0.18)
                    }
                }


                if (step >= 20) {
                    draw_stop_lever(mat4_mul(mvp, translation_mat4([0, 0, offset("Stop_lever")])), rot, sliding_offset, colors["Stop_lever"]);

                    gl.draw_mesh("Barrel_bridge", mat4_mul(mvp, translation_mat4([0, 0, offset("Barrel_bridge")])), rot, colors["Barrel_bridge"]);

                    gl.draw_mesh("Cylinder", mat4_mul(mvp, mat4_mul(translation_mat4([3.2259, 11.0215, offset("Barrel_bridge") + 0.5]), scale_mat4([0.39, 0.39, 0.5]))), rot, colors["Barrel_bridge"]);

                    gl.draw_mesh("Cylinder", mat4_mul(mvp, mat4_mul(translation_mat4([10.725, -3.875, offset("Barrel_bridge") + 0.5]), scale_mat4([0.39, 0.39, 0.5]))), rot, colors["Barrel_bridge"]);


                    if (!params["skip_screws"]) {
                        draw_screw(mvp, rot, colors["Barrel_bridge_screw"], true, [3.425, 9.482, -0.43 + offset("Barrel_bridge_screw")], offset("Barrel_bridge_screw_a") + 1, 0.32, 0.6, 1, 0.18);

                        draw_screw(mvp, rot, colors["Barrel_bridge_screw"], true, [-4.25, 7.665, -0.43 + offset("Barrel_bridge_screw")], offset("Barrel_bridge_screw_a") + 2, 0.32, 0.6, 1, 0.18);

                        draw_screw(mvp, rot, colors["Barrel_bridge_screw"], true, [10.08, -2.585, -0.43 + offset("Barrel_bridge_screw")], offset("Barrel_bridge_screw_a") + 3, 0.32, 0.6, 1, 0.18);
                    }
                }

                if (step >= 23) {
                    draw_ratchet_wheel(mat4_mul(mvp, translation_mat4([0, 0, offset("Ratchet_wheel")])), rot, arbor_angle, colors["Ratchet_wheel"]);

                    if (!params["skip_screws"]) {
                        draw_screw(mvp, rot, colors["Ratchet_wheel_screw"], true, [5.78, 2.89, -1.07 - 0.18 + offset("Ratchet_wheel_screw")], offset("Ratchet_wheel_screw_a") + 5, 0.32, 0.9, 1, 0.18);
                    }
                }

                if (step >= 30) {
                    draw_click(mat4_mul(mvp, translation_mat4([0, 0, offset("Click")])), rot, click_angle, colors["Click"]);
                }
                if (step >= 33) {

                    draw_click_spring(mat4_mul(mvp, translation_mat4([0, 0, offset("Click_spring")])), rot, click_spring_flex, colors["Click_spring"]);
                }
                if (step >= 40) {
                    let angle = -arbor_angle * wrat_n / wcr_n - 0.02;
                    draw_crown_wheel(mat4_mul(mvp, translation_mat4([0, 0, offset("Crown_wheel")])), rot, angle, colors["Crown_wheel"]);

                    if (!params["skip_screws"]) {

                        draw_screw(mvp, rot, colors["Crown_wheel_screw"], true, [0.58, 6.984, -1.37 + offset("Crown_wheel_screw")], offset("Crown_wheel_screw_a") + 3, 3.68 * 0.5, 1.58 * 0.5, 0.12, 0.2);

                        gl.draw_mesh("Cylinder", mat4_mul(mat4_mul(mvp, translation_mat4([0.58, 6.984, -1.37 + 1.12 + offset("Crown_wheel_screw")])), scale_mat4([0.25, 0.25, 1])), rot, colors["Crown_wheel_screw"]);

                    }
                }


                if (step >= 45) {

                    draw_cannon_wheel(mat4_mul(mvp, translation_mat4([0, 0, offset("Cannon_wheel")])), rot, -escape_angle * w50_n / w41_n * w40_n / w31_n * w30_n / wc0_n + 0.063, colors["Cannon_wheel"]);

                    if (params && params["mode"] === mode_time_set) {
                        let ai = -setting_wheel_angle * ws_n / wi0_n + 0.22;

                        draw_cannon_pinion(mat4_mul(mvp, translation_mat4([0, 0, offset("Cannon_pinion")])), rot, -ai * wi0_n / wc1_n + 0.12, colors["Cannon_pinion"]);

                    } else {

                        draw_cannon_pinion(mat4_mul(mvp, translation_mat4([0, 0, offset("Cannon_pinion")])), rot, -escape_angle * w50_n / w41_n * w40_n / w31_n * w30_n / wc0_n + 0.063, colors["Cannon_pinion"]);
                    }
                }


                if (step >= 48 || step == -20) {

                    draw_intermediate_wheel(mat4_mul(mvp, translation_mat4([0, 0, offset("Intermediate_wheel")])), rot, intermediate_angle, colors["Intermediate_wheel"]);
                    draw_hour_wheel(mat4_mul(mvp, translation_mat4([0, 0, offset("Hour_wheel")])), rot, hour_angle, colors["Hour_wheel"]);
                }

                if (step >= 50) {


                    let jumper_t = -date_ring_angle * 31 / (2 * pi) % 1;

                    let jumper_flex = 0.17 + smooth_step(0.03, 0.2, jumper_t) * 0.15 - smooth_step(0.3, 0.92, jumper_t) * 0.11 - smooth_step(0.92, 1.0, jumper_t) * 0.04;


                    jumper_flex += offset("Date_jumper_flex");

                    gl.draw_mesh("Date_jumper", mat4_mul(mvp, translation_mat4([0, 0, offset("Date_jumper")])), rot, colors["Date_jumper"], 1, "date_jumper", [jumper_flex, 0, 0, 0]);


                    {
                        let angle = -hour_angle * wh0_n / wdb0_n + 0.13;
                        let mat = mat4_mul(mvp, translation_mat4([-0.286, -4.17, 1.66 + offset("Date_jumper_plate")]));
                        mat = mat4_mul(mat, rot_z_mat4(angle));

                        let r = mat3_mul(rot, rot_z_mat3(angle));

                        let color = colors["Date_jumper_gears"]

                        gl.draw_gear_teeth_mesh("wdb1", mat, r, color);

                        gl.draw_mesh("Pinion_center", mat4_mul(mat4_mul(mat, translation_mat4([0, 0, 0.06])), scale_mat4([0.3, 0.3, 0.12])), rot, color, 1, "axial_resize", [0.8, 0.19 * 2 / 0.3, 0.0, 1.0]);


                        gl.draw_gear_teeth_mesh("wdb0", mat4_mul(mat, translation_mat4([0, 0, 0.36])), r, color);

                        gl.draw_mesh("Pinion_center", mat4_mul(mat4_mul(mat, translation_mat4([0, 0, 0.42])), scale_mat4([0.6, 0.6, 0.12])), rot, color, 1, "axial_resize", [0.8, 0.19 * 2 / 0.6, 0.0, 1.0]);

                        gl.draw_mesh("Date_jumper_plate", mat4_mul(mvp, translation_mat4([0, 0, offset("Date_jumper_plate")])), rot, colors["Date_jumper_plate"]);

                        if (!params["skip_screws"]) {

                            draw_screw(mvp, rot, colors["Date_jumper_plate_screw"], false, [0.8, -6.26, 1.9 + offset("Date_jumper_plate_screw")], offset("Date_jumper_plate_screw_a") + 3, 0.32, 0.6, 1, 0.18);

                        }
                    }

                    let spring_angle = 3.6;

                    draw_date_indicator_driver(mat4_mul(mvp, translation_mat4([0, 0, offset("Date_indicator")])), rot, date_indicator_gear_angle, spring_angle, indicator_flex, offsets, colors);


                }

                if (step >= 90) {
                    draw_crown(mvp, rot, crown_angle, stem_offset, colors["Crown"]);
                    draw_winding_stem(mvp, rot, crown_angle, stem_offset, colors["Winding_stem"]);
                    draw_winding_pinion(mat4_mul(mvp, translation_mat4([0, 0, offset("Winding_pinion")])), rot, winding_angle, colors["Winding_pinion"]);
                    draw_sliding_pinion(mat4_mul(mvp, translation_mat4([0, 0, offset("Sliding_pinion")])), rot, crown_angle, sliding_offset, colors["Sliding_pinion"]);
                }

                if (step >= 100) {
                    draw_keyless_mechanism(mvp, rot, step, colors, offsets, stem_offset, setting_wheel_angle);
                }

                if (step >= 135) {

                    let mat = mat4_mul(mvp, translation_mat4([2.3, 6.87 + date_corrector_offset, 1.66 + offset("Date_corrector")]));
                    mat = mat4_mul(mat, rot_z_mat4(date_corrector_angle));

                    let color = colors["Date_corrector"];
                    gl.draw_mesh("Date_corrector", mat4_mul(mat4_mul(mat, scale_mat4([1.1, 1.1, 0.8])), translation_mat4([0, 0, -4.9])), rot, color);
                    gl.draw_gear_teeth_mesh("wdcorr", mat, rot, color);

                    gl.draw_mesh("Cylinder", mat4_mul(mat, mat4_mul(translation_mat4([0, 0, -0.1]), scale_mat4([0.25, 0.25, 0.3]))), rot, color);
                }


                if (step >= 140) {


                    gl.draw_mesh("Minute_train_bridge", mat4_mul(mvp, translation_mat4([0, 0, offset("Minute_train_bridge")])), rot, colors["Minute_train_bridge"]);

                    draw_screw(mvp, rot, colors["Minute_train_bridge_screw"], false, [-2.285, 6.6, 1.9 + offset("Minute_train_bridge_screw")], offset("Minute_train_bridge_screw_a") + 3, 0.3, 0.6, 1, 0.18);

                }

                if (step >= 150) {

                    let weight_angle = 0;
                    if (params && params["Weight_angle"] !== undefined)
                        weight_angle = params["Weight_angle"];

                    let t0 = -weight_angle * wweight_n / wrev_t_n + 0.13;
                    let t1 = -weight_angle * wweight_n / wrev_t_n + 0.16;

                    let p = [0, 0, 0, 0, 0, 0];
                    if (params && params["auto_params"] !== undefined) {
                        p = params["auto_params"];

                    }
                    draw_automatic(mat4_mul(mvp, translation_mat4([0, 0, offset("Automatic_assembly")])), rot, weight_angle, t0, t1, p, colors, offsets, params["skip_screws"]);
                }


                if (params["show_date_ring"]) {
                    draw_date_ring(mvp, rot, date_ring_angle, offset("Date_ring"));
                }


                if (params["show_dial"]) {
                    draw_dial(mat4_mul(mvp, translation_mat4([0, 0, offset("Dial")])), rot);
                }

                if (params["show_second_hand"]) {
                    let a = -escape_angle * w50_n / w41_n + 1.07
                    let m = mat4_mul(mvp, translation_mat4([0, 0, 124.7 + offset("Second_hand")]));
                    m = mat4_mul(m, rot_z_mat4(a));

                    let r = mat3_mul(rot, rot_z_mat3(a));
                    gl.draw_mesh("Second_hand", m, r, hand_color);
                }

                if (params["show_minute_hand"]) {
                    let m = mat4_mul(mvp, translation_mat4([0, 0, 124.4 + offset("Minute_hand")]));
                    m = mat4_mul(m, rot_z_mat4(minute_angle + pi));

                    let r = mat3_mul(rot, rot_z_mat3(minute_angle + + pi));
                    gl.draw_mesh("Minute_hand", m, r, hand_color);
                }

                if (params["show_hour_hand"]) {
                    let m = mat4_mul(mvp, translation_mat4([0, 0, 124 + offset("Hour_hand")]));
                    m = mat4_mul(m, rot_z_mat4(hour_angle + pi));

                    let r = mat3_mul(rot, rot_z_mat3(hour_angle + pi));
                    gl.draw_mesh("Hour_hand", m, r, hand_color);
                }

                if (step >= 0) {
                    let off = offset("Mainplate") + offset("Mainplate_jewels");
                    let color = colors["Mainplate"] !== undefined;

                    draw_jewel(mat4_mul(mvp, translation_mat4([5.78, 2.89, off + 1.54])), rot, 1.3342, 0.66, 0.55, 0.45, color);
                    draw_jewel(mat4_mul(mvp, translation_mat4([6.025, -4.137, off + 1.71])), rot, 1.144, 0.28, 0.35, undefined, color);
                    draw_jewel(mat4_mul(mvp, translation_mat4([2.489, -2.765, off + 1.71])), rot, 0.66, 0.14, 0.35, undefined, color);
                    draw_jewel(mat4_mul(mvp, translation_mat4([-2.072, -3.03, off + 1.])), rot, 0.863, 0.14, 0.34, undefined, color);

                    draw_jewel(mat4_mul(mvp, translation_mat4([-4.305, -1.325, off + 1.63])), rot, 0.84, 0.14, 0.4, undefined, color);

                    let m = mat4_mul(mvp, translation_mat4([-6.54, 0.3751, 11.4]));
                    m = mat4_mul(m, rot_x_mat4(pi));

                    draw_jewel(mat4_mul(m, translation_mat4([0, 0, 9.55 + off])), mat3_mul(rot, rot_x_mat3(pi)), 0.8, 0.14, 0.2, undefined, color);
                    gl.draw_mesh("Shock_jewel", mat4_mul(m, translation_mat4([0, 0, off])), mat3_mul(rot, rot_x_mat3(pi)), color ? jewel_color : neutral_jewel_color, 1, "jewel", [1, 1, 1, 1]);
                }

                if (step >= 3) {
                    draw_pallet_fork_jewels(mat4_mul(mvp, translation_mat4([0, 0, offset("Pallet_fork")])), rot, fork_angle, colors["Pallet_fork"] !== undefined);
                }

                if (step >= 5) {


                    let off = offset("Pallet_bridge");
                    let color = colors["Pallet_bridge"] !== undefined;

                    draw_jewel(mat4_mul(mat4_mul(mvp, translation_mat4([-4.305, -1.325, off + 0.6])), rot_x_mat4(pi)), rot, 0.84, 0.14, 0.2, undefined, color);

                }

                if (step >= 13) {
                    let off = offset("Train_bridge");
                    let color = colors["Train_bridge"] !== undefined;

                    draw_jewel(mat4_mul(mvp, mat4_mul(translation_mat4([6.025, -4.137, off + -0.7]), rot_x_mat4(pi))), rot, 1.144, 0.28, 0.45, undefined, color);
                    draw_jewel(mat4_mul(mvp, mat4_mul(translation_mat4([2.489, -2.765, off + -0.94]), rot_x_mat4(pi))), rot, 0.66, 0.14, 0.21, undefined, color);
                    draw_jewel(mat4_mul(mvp, mat4_mul(translation_mat4([-2.072, -3.03, off + -0.94]), rot_x_mat4(pi))), rot, 0.863, 0.14, 0.21, undefined, color);
                    draw_jewel(mat4_mul(mvp, mat4_mul(translation_mat4([0, 0, off + -0.94]), rot_x_mat4(pi))), rot, 0.98, 0.14, 0.31, undefined, color);
                }



                if (step >= 16) {

                    let mm = mvp;

                    mm = mat4_mul(mvp, translation_mat4([offset("Balance_assembly_x"), offset("Balance_assembly_y"), offset("Balance_assembly_z")]));
                    mm = mat4_mul(mm, rot_y_mat4(offset("Balance_assembly_rot")));


                    draw_balance_wheel_jewel(mat4_mul(mm, translation_mat4([0, 0, offset("Balance_wheel")])), rot, corrected_balance_angle, colors["Balance_wheel"] !== undefined);

                    let m = mat4_mul(mm, translation_mat4([-6.54, 0.3751, -10.5]));

                    draw_jewel(mat4_mul(m, translation_mat4([0, 0, 9.55])), rot, 0.8, 0.14, 0.2, undefined);
                    gl.draw_mesh("Shock_jewel", mat4_mul(m, translation_mat4([0, 0, 0])), rot, neutral_jewel_color, 1, "jewel", [1, 1, 1, 1]);
                }

                if (step >= 20) {
                    let off = offset("Barrel_bridge");
                    let color = colors["Barrel_bridge"] !== undefined;

                    draw_jewel(mat4_mul(mvp, translation_mat4([5.78, 2.89, off - 0.9])), rot, 1.9, 1.58, 0.3, 0.2, color);

                }


                if (step >= 150) {
                    draw_automatic_jewels(mat4_mul(mvp, translation_mat4([0, 0, offset("Automatic_assembly")])), rot, offsets, false);
                }
            }



            function draw_date_indicator_driver(mvp, rot, angle, spring_angle, spring, offsets, colors) {

                function offset(name) {
                    return offsets[name] ? offsets[name] : 0;
                }

                let m = mvp;
                m = mat4_mul(m, translation_mat4([-3.54, -5.255, offset("Date_indicator_driver")]));
                m = mat4_mul(m, rot_z_mat4(angle));

                rot = mat3_mul(rot, rot_z_mat3(angle));

                gl.draw_mesh("Date_indicator_spring", mat4_mul(mat4_mul(m, rot_z_mat4(spring_angle)), translation_mat4([0, 0, -5.18])), rot, colors["Date_indicator_spring"], 1,
                    "date_indicator_spring", [spring, -0.07 * spring, -5.8, -1.2]);

                let color = colors["Date_indicator_gear"];
                gl.draw_gear_teeth_mesh("wdid", mat4_mul(m, translation_mat4([0, 0, 1.66])), rot, color);

                gl.draw_mesh("Cylinder", mat4_mul(m, mat4_mul(translation_mat4([0, 0, 1.6]), scale_mat4([0.15, 0.15, 0.4]))), rot, color);

                if (!offset("Date_indicator_cover_hidden")) {
                    gl.draw_mesh("Cylinder", mat4_mul(m, mat4_mul(translation_mat4([0, 0, 1.96]), scale_mat4([1.85, 1.85, 0.14]))), rot, colors["Date_indicator_cover"]);
                }
                else {
                    gl.draw_mesh("Cylinder", mat4_mul(m, mat4_mul(translation_mat4([0, 0, 1.9]), scale_mat4([0.34, 0.34, 0.2]))), rot, colors["Date_indicator_cover"]);
                }


            }

            function draw_date_ring(mvp, rot, angle, offset) {
                mvp = mat4_mul(mat4_mul(mvp, rot_z_mat4(angle)), translation_mat4([0, 0, offset]));
                rot = mat3_mul(rot, rot_z_mat3(angle));

                gl.draw_mesh("Date_ring", mvp, rot, white_color);


                for (let i = 0; i < 31; i++) {

                    let number = i + 1;
                    let count = number < 10 ? 1 : 2;
                    0.4
                    let kern = 0.37;
                    if (number >= 10 && number <= 19)
                        kern = 0.28;

                    if (number == 20)
                        kern = 0.34;

                    for (let k = 0; k < count; k++) {

                        let digit = (Math.floor(number / (1 + k * 9)) % 10);
                        let a = (i + 10) * 2 * pi / 31 - 0.05

                        let offset = lerp(58, 127.5, ((digit + 9) % 10) / 9);
                        let m = translation_mat4([-offset, 0, 0]);
                        m = mat4_mul(rot_x_mat4(pi), m);
                        m = mat4_mul(scale_mat4(0.14), m);
                        m = mat4_mul(translation_mat4([9.8 + (count - k * 2) * kern * 1.4, 0, 2.1]), m);
                        m = mat4_mul(rot_z_mat4(a), m);

                        let r = mat3_mul(rot_x_mat3(pi), rot_z_mat3(a));

                        gl.draw_mesh("D" + digit, mat4_mul(mvp, m), mat3_mul(rot, r), digit_color, 1, "no_lines");

                    }
                }

            }

            function draw_dial(mvp, rot) {


                gl.draw_mesh("Dial", mat4_mul(mvp, translation_mat4([0, 0, -29.7])), rot, dial_color);


                for (let i = 0; i < 60; i++) {


                    let l = (i % 5 == 0) ? 1.2 : 0.4
                    let m = rot_z_mat4(i * 2 * pi / 60);
                    m = mat4_mul(m, translation_mat4([0, 12.85 - l / 2, 2.6]));
                    m = mat4_mul(m, scale_mat4([0.2, l, 0.1]));

                    let r = rot_z_mat3(i * 2 * pi / 60);

                    gl.draw_mesh("Cube", mat4_mul(mvp, m), mat3_mul(rot, r), dark_gray_color, 1, "no_lines");

                }

            }


            function draw_cannon_wheel(mvp, rot, angle, color) {
                mvp = mat4_mul(mvp, translation_mat4([0, 0, 1.42]));
                mvp = mat4_mul(mvp, rot_z_mat4(angle));

                rot = mat3_mul(rot, rot_z_mat3(angle));

                gl.draw_mesh("Cannon_wheel", mat4_mul(mvp, translation_mat4([0, 0, 10.72])), rot, color);

                gl.draw_gear_teeth_mesh("wc0", mat4_mul(mvp, translation_mat4([0, 0, +0.06])), rot, color);
            }

            function draw_cannon_pinion(mvp, rot, angle, color) {
                mvp = mat4_mul(mvp, translation_mat4([0, 0, 1.42]));
                mvp = mat4_mul(mvp, rot_z_mat4(angle));

                rot = mat3_mul(rot, rot_z_mat3(angle));

                gl.draw_mesh("Cannon_pinion", mat4_mul(mvp, translation_mat4([0, 0, 10.72])), rot, color);
                gl.draw_gear_teeth_mesh("wc1", mat4_mul(mvp, translation_mat4([0, 0, 0.15 + 0.12])), rot, color);
            }

            function draw_intermediate_wheel(mvp, rot, angle, color) {
                mvp = mat4_mul(mvp, translation_mat4([-0.79, 3.525, 1.8]));
                mvp = mat4_mul(mvp, rot_z_mat4(angle));

                rot = mat3_mul(rot, rot_z_mat3(angle));

                gl.draw_mesh("Pinion_center", mat4_mul(mvp, mat4_mul(translation_mat4([0, 0, 0.3]), scale_mat4([0.45, 0.45, 0.48]))), rot, color, 1, "axial_resize", [0.8, 0.4 / 0.45, 0.0, 1.0]);

                gl.draw_gear_teeth_mesh("wi1", mat4_mul(mvp, translation_mat4([0, 0, -0.24 + 0.3])), rot, color);

                gl.draw_mesh("Pinion_center", mat4_mul(mvp, scale_mat4([2, 2, 0.18])), rot, color, 1, "axial_resize", [0.8, 0.65, 0.0, 1.0]);

                gl.draw_gear_teeth_mesh("wi0", mat4_mul(mvp, translation_mat4([0, 0, -0.09])), rot, color);
            }


            function draw_hour_wheel(mvp, rot, angle, color) {
                mvp = mat4_mul(mvp, translation_mat4([0, 0, 1.9]));
                mvp = mat4_mul(mvp, rot_z_mat4(angle));

                rot = mat3_mul(rot, rot_z_mat3(angle));

                gl.draw_mesh("Hour_wheel", mat4_mul(mvp, translation_mat4([0, 0, 18.9])), rot, color);

                gl.draw_gear_teeth_mesh("wh0", mat4_mul(mvp, translation_mat4([0, 0, 0.1])), rot, color);

            }

            function draw_crown(mvp, rot, angle, offset, color, long) {
                mvp = mat4_mul(mvp, translation_mat4([0, 0 + offset, 0.29]));
                mvp = mat4_mul(mvp, rot_y_mat4(angle));

                rot = mat3_mul(rot, rot_y_mat3(angle));

                gl.draw_mesh("Crown", mat4_mul(mvp, translation_mat4([0, long ? 6 : 1, 0])), rot, color);
            }

            function draw_winding_stem(mvp, rot, angle, offset, color, long) {
                mvp = mat4_mul(mvp, translation_mat4([0, 0 + offset, 0.29]));
                mvp = mat4_mul(mvp, rot_y_mat4(angle));

                rot = mat3_mul(rot, rot_y_mat3(angle));

                gl.draw_mesh("Winding_stem", mat4_mul(mvp, translation_mat4([0, 0, 0])), rot, color);

                let m = mat4_mul(mvp, translation_mat4([0, 12.96, 0]));
                m = mat4_mul(m, rot_x_mat4(pi * 0.5));
                m = mat4_mul(m, scale_mat4([0.44, 0.44, long ? 6 : 1.2]));

                let r = mat3_mul(rot, rot_x_mat3(pi * 0.5));

                gl.draw_mesh("Cylinder", m, r, color);

                m = mat4_mul(mvp, translation_mat4([0, 12.96 - 2, 0]));
                m = mat4_mul(m, rot_x_mat4(pi * 0.5));
                m = mat4_mul(m, scale_mat4([0.54, 0.54, 2]));

                gl.draw_mesh("Cylinder", m, r, color);

                m = mat4_mul(mvp, translation_mat4([0, 12.96 - 2.7, 0]));
                m = mat4_mul(m, rot_x_mat4(pi * 0.5));
                m = mat4_mul(m, scale_mat4([0.34, 0.34, 0.7]));

                gl.draw_mesh("Cylinder", m, r, color);

                m = mat4_mul(mvp, translation_mat4([0, 12.96 - 2.7 - 0.36, 0]));
                m = mat4_mul(m, rot_x_mat4(pi * 0.5));
                m = mat4_mul(m, scale_mat4([0.54, 0.54, 0.36]));

                gl.draw_mesh("Cylinder", m, r, color);
            }

            function draw_winding_pinion(mvp, rot, angle, color) {

                mvp = mat4_mul(mvp, translation_mat4([0, 10.0, 0.29]));
                mvp = mat4_mul(mvp, rot_x_mat4(-pi * 0.5));
                mvp = mat4_mul(mvp, translation_mat4([0, 0, -20.49]));


                mvp = mat4_mul(mvp, rot_z_mat4(angle));

                rot = mat3_mul(rot, rot_x_mat3(-pi * 0.5));
                rot = mat3_mul(rot, rot_z_mat3(angle));


                gl.draw_mesh("Winding_pinion", mat4_mul(mvp, translation_mat4([0, 0, 0])), rot, color);
                gl.draw_gear_teeth_mesh("wwin", mat4_mul(mvp, translation_mat4([0, 0, 20.33])), rot, color);

            }

            function yoke_angle_(stem_offset) {

                let yoke_angle = -0.12;
                yoke_angle += -Math.pow(sharp_step(0.06, 0.18, stem_offset), 0.65) * 0.03;
                yoke_angle += -sharp_step(0.08, 0.13, stem_offset) * 0.004;
                yoke_angle += sharp_step(0.25, 0.29, stem_offset) * 0.008;
                yoke_angle += -sharp_step(0.28, 0.5, stem_offset) * 0.015;
                yoke_angle += -Math.pow(sharp_step(0.49, 0.665, stem_offset), 0.9) * 0.072;
                yoke_angle += -sharp_step(0.52, 0.62, stem_offset) * 0.015;
                yoke_angle += sharp_step(0.77, 0.8, stem_offset) * 0.008;

                return yoke_angle;
            }

            function draw_sliding_pinion(mvp, rot, angle, offset, color) {
                const base_offset = -15.62;

                mvp = mat4_mul(mvp, translation_mat4([0, 8.12, 0.29]));
                mvp = mat4_mul(mvp, rot_x_mat4(-pi * 0.5));
                mvp = mat4_mul(mvp, translation_mat4([0, 0, offset + base_offset]));

                mvp = mat4_mul(mvp, rot_z_mat4(angle));

                rot = mat3_mul(rot, rot_x_mat3(-pi * 0.5));
                rot = mat3_mul(rot, rot_z_mat3(angle));


                gl.draw_mesh("Sliding_pinion", mvp, rot, color);
            }

            function draw_keyless_mechanism(mvp, rot, step, colors, offsets, stem_offset, setting_wheel_angle) {


                function offset(name) {
                    return offsets[name] ? offsets[name] : 0;
                }

                let setting_angle = 2.92 - stem_offset * 0.7;

                let correct_angle = 2.095;
                correct_angle += sharp_step(0.0, 0.27, stem_offset) * 0.11;
                correct_angle += -sharp_step(0.13, 0.27, stem_offset) * 0.027;
                correct_angle += -sharp_step(0.39, 0.45, stem_offset) * 0.005;
                correct_angle += -sharp_step(0.452, 0.62, stem_offset) * 0.215;
                correct_angle += -sharp_step(0.645, 0.665, stem_offset) * 0.01;
                correct_angle += sharp_step(0.77, 0.8, stem_offset) * 0.01;


                let yoke_angle = yoke_angle_(stem_offset);

                if (offsets["yoke_angle_override"] !== undefined) {
                    yoke_angle = offsets["yoke_angle_override"];
                }


                let jumper_angle = 0.457;

                let jumper_bend = 0.078;
                jumper_bend += Math.pow(smooth_step(0.00, 0.18, stem_offset), 0.7) * 0.03;
                jumper_bend += -Math.pow(smooth_step(0.16, 0.31, stem_offset), 3) * 0.028;
                jumper_bend += Math.pow(smooth_step(0.31, 0.5, stem_offset), 0.6) * 0.064;
                jumper_bend += -Math.pow(sharp_step(0.5, 0.8, stem_offset), 1.5) * 0.063;

                let jumper_spring_bend = -0.01 + yoke_angle * 0.09;


                {
                    let color = colors["Corrector_lever"];

                    let m = mvp;
                    m = mat4_mul(m, translation_mat4([-1.9544, 8.86, 1 + offset("Corrector_lever")]));
                    m = mat4_mul(m, rot_z_mat4(correct_angle));
                    m = mat4_mul(m, rot_x_mat4(pi));
                    m = mat4_mul(m, translation_mat4([6.194, -28.055, -92.65]));

                    let r = rot;
                    r = mat3_mul(r, rot_z_mat3(correct_angle));
                    r = mat3_mul(r, rot_x_mat3(pi));

                    gl.draw_mesh("Corrector_lever", m, r, color);

                    {
                        let m = mvp;

                        m = mat4_mul(m, translation_mat4([-1.9544, 8.86, 1 + offset("Corrector_lever")]));
                        m = mat4_mul(m, rot_z_mat4(correct_angle));
                        m = mat4_mul(m, translation_mat4([-2.546, -0.915, 0.7]));

                        if (step >= 110) {
                            let color = colors["Setting_wheel"];
                            let off = offset("Setting_wheel");
                            gl.draw_gear_teeth_mesh("ws0", mat4_mul(m, mat4_mul(translation_mat4([0, 0, -0.3 + off]), rot_z_mat4(setting_wheel_angle))), mat3_mul(rot, rot_z_mat3(setting_wheel_angle)), color);
                            gl.draw_mesh("Pinion_center", mat4_mul(m, mat4_mul(translation_mat4([0, 0, +0.11 + off]), scale_mat4([0.6, 0.6, 0.82]))), rot, color, 1, "axial_resize", [0.8, 0.6 / 0.6, 0.0, 1.0]);
                        }


                        m = mat4_mul(m, scale_mat4([0.3, 0.3, 1.0]));
                        m = mat4_mul(m, translation_mat4([0, 0, 0.2]));

                        let r = rot;
                        r = mat3_mul(r, rot_z_mat3(correct_angle));

                        gl.draw_mesh("Cylinder", m, r, color);




                        m = mvp;
                        m = mat4_mul(m, translation_mat4([-1.9544, 8.86, 1 + offset("Corrector_lever")]));
                        m = mat4_mul(m, rot_z_mat4(correct_angle));
                        m = mat4_mul(m, translation_mat4([1.044, -0.6519, 0.1]));
                        m = mat4_mul(m, scale_mat4([0.125, 0.125, 0.2]));

                        gl.draw_mesh("Cylinder", m, r, color);
                    }
                }

                {
                    let color = colors["Setting_lever"];
                    let m = mvp;
                    m = mat4_mul(m, translation_mat4([1.39, 11.03, 1 + offset("Setting_lever")]));
                    m = mat4_mul(m, rot_z_mat4(setting_angle));
                    m = mat4_mul(m, translation_mat4([10.7, 45.0, -90.83]));

                    let r = rot;
                    r = mat3_mul(r, rot_z_mat3(setting_angle));

                    gl.draw_mesh("Setting_lever", m, r, color);

                    {
                        let m = mvp;
                        m = mat4_mul(m, translation_mat4([1.39, 11.03, 1 + offset("Setting_lever")]));
                        m = mat4_mul(m, rot_z_mat4(setting_angle));
                        m = mat4_mul(m, translation_mat4([0, 0, -0.16]));
                        m = mat4_mul(m, scale_mat4([0.33, 0.33, 0.37]));

                        gl.draw_mesh("Cylinder", m, r, color);
                    }

                    {
                        let m = mvp;
                        m = mat4_mul(m, translation_mat4([1.39, 11.03, 1 + offset("Setting_lever")]));
                        m = mat4_mul(m, rot_z_mat4(setting_angle));
                        m = mat4_mul(m, translation_mat4([1.25, 0.7, -0.16]));
                        m = mat4_mul(m, scale_mat4([0.33, 0.33, 0.2]));

                        gl.draw_mesh("Cylinder", m, r, colors["Setting_lever_pivot"] ? colors["Setting_lever_pivot"] : color);
                    }

                    {
                        let m = mvp;
                        m = mat4_mul(m, translation_mat4([1.39, 11.03, 1 + offset("Setting_lever")]));
                        m = mat4_mul(m, rot_z_mat4(setting_angle));
                        m = mat4_mul(m, translation_mat4([2.64, 1.4, -0.06]));
                        m = mat4_mul(m, scale_mat4([0.17, 0.17, 0.37]));

                        gl.draw_mesh("Cylinder", m, r, colors["Setting_lever_pivot2"] ? colors["Setting_lever_pivot2"] : color);
                    }



                    {
                        let m = mvp;

                        let angle = setting_angle + pi * 0.3035;
                        m = mat4_mul(m, translation_mat4([1.39, 11.03, 1.49 + offset("Setting_lever")]));
                        m = mat4_mul(m, rot_z_mat4(angle));
                        m = mat4_mul(m, translation_mat4([0, 2.25, -0.13]));
                        m = mat4_mul(m, scale_mat4([0.165, 0.165, 0.2]));

                        let r = rot;
                        r = mat3_mul(r, rot_z_mat3(angle));

                        gl.draw_mesh("Cylinder", m, r, colors["Setting_lever_pivot3"] ? colors["Setting_lever_pivot3"] : color);
                    }

                }

                if (step >= 120) {
                    let m = mvp;
                    m = mat4_mul(m, translation_mat4([-5.71, 9.225, 1 + offset("Yoke")]));
                    m = mat4_mul(m, rot_z_mat4(yoke_angle));
                    m = mat4_mul(m, translation_mat4([-1.34, 39.74, -90.85]));

                    let r = rot;
                    r = mat3_mul(r, rot_z_mat3(yoke_angle));

                    gl.draw_mesh("Yoke", m, r, colors["Yoke"]);
                }

                if (step >= 130) {
                    let m = mvp;
                    m = mat4_mul(m, translation_mat4([-5.71, 9.225, 1.47 + offset("Setting_lever_jumper")]));
                    m = mat4_mul(m, rot_z_mat4(jumper_angle));
                    m = mat4_mul(m, rot_x_mat4(pi));
                    m = mat4_mul(m, translation_mat4([-19.76, 42.1, -90.7]));

                    let r = rot;
                    r = mat3_mul(r, rot_z_mat3(jumper_angle));
                    r = mat3_mul(r, rot_x_mat3(pi));

                    let params = [0, 0, 0, 0];
                    params[0] = jumper_bend;
                    params[1] = jumper_spring_bend;

                    gl.draw_mesh("Setting_lever_jumper", m, r, colors["Setting_lever_jumper"], 1, "jumper", params);

                    draw_screw(mvp, rot, colors["Setting_lever_jumper_screw"], false, [-5.133, 7.307, 1.42 + offset("Setting_lever_jumper_screw")], offset("Setting_lever_jumper_screw_a"), 0.28, 0.65, 1, 0.18);

                }
            }

            function draw_ratchet_wheel(mvp, rot, angle, color) {

                mvp = mat4_mul(mvp, translation_mat4([5.78, 2.89, -1]));
                mvp = mat4_mul(mvp, rot_z_mat4(angle));

                rot = mat3_mul(rot, rot_z_mat3(angle));

                gl.draw_mesh("Ratchet_wheel", mat4_mul(mvp, translation_mat4([0, 0, 22.39])), rot, color);

                gl.draw_gear_teeth_mesh("wrat", mat4_mul(mvp, translation_mat4([0, 0, -0.125])), rot, color);

            }

            function draw_crown_wheel(mvp, rot, angle, color) {

                mvp = mat4_mul(mvp, translation_mat4([0.58, 6.984, -0.75]));
                mvp = mat4_mul(mvp, rot_z_mat4(angle));

                rot = mat3_mul(rot, rot_z_mat3(angle));

                gl.draw_mesh("Crown_wheel", mat4_mul(mvp, translation_mat4([0, 0, 22.39])), rot, color);
                gl.draw_gear_teeth_mesh("wcr", mat4_mul(mvp, translation_mat4([0, 0, -0.2505])), rot, color);


            }


            function balance_params(t) {

                t += 99.87
                let period = 0.25;
                let argument = t * 2 * pi / period;
                let amplitude = 2.26;
                let escape_i = Math.floor(t / period + 0.75);

                let incoming = ((t + 0.125 / 2) % 0.25) >= 0.125;

                let balance_angle = amplitude * Math.sin(argument);

                if (!incoming) {
                    balance_angle *= -1;
                }


                let corrected_balance_angle = balance_angle;


                let fork_angle = -0.125;
                fork_angle += sharp_step(0.475, 0.374, balance_angle) * (0.023);
                fork_angle += sharp_step(0.374, -0.2, balance_angle) * 0.12;
                fork_angle += Math.pow(sharp_step(0.374, -0.05, balance_angle), 2) * 1 * 0.063;
                fork_angle += sharp_step(0.17, 0.02, balance_angle) * 0.024;
                fork_angle += sharp_step(-0.05, -0.2, balance_angle) * 0.02;

                if (!incoming) {
                    fork_angle -= sharp_step(0.12, -0.1, balance_angle) * 0.03;
                    fork_angle += sharp_step(-0.025, -0.1, balance_angle) * 0.03;

                }


                if (balance_angle < 0.18 && balance_angle > -amplitude * 0.9) {

                    if (incoming) {
                        corrected_balance_angle += -(fork_angle + 0.04506) * 1.85;
                        corrected_balance_angle += sharp_step(-0.2, -amplitude * 0.9, balance_angle) * 0.320161;
                    } else {
                        corrected_balance_angle += -(fork_angle + 0.04506) * 1.55;
                        corrected_balance_angle += -sharp_step(-0.05, -0.2, balance_angle) * 0.05;
                        corrected_balance_angle += sharp_step(-0.2, -amplitude * 0.9, balance_angle) * 0.318243;
                    }
                }


                if (!incoming) {
                    corrected_balance_angle *= -1;
                    fork_angle *= -1;
                }

                let escape_angle = 0.302;

                if (incoming) {
                    escape_angle -= sharp_step(0.475, 0.374, balance_angle) * (0.004);
                    escape_angle += sharp_step(0.374, 0.2, balance_angle) * (0.09) * (0.167);
                    escape_angle += Math.pow(sharp_step(0.374, -0.18, balance_angle), 2) * (0.91) * (0.167);
                } else {
                    escape_angle = 0.465;
                    escape_angle -= sharp_step(0.475, 0.374, balance_angle) * (0.004);
                    escape_angle += sharp_step(0.374, 0.2, balance_angle) * (0.09) * (0.15516);
                    escape_angle += Math.pow(sharp_step(0.374, -0.18, balance_angle), 2) * (0.91) * (0.15516);
                }

                escape_angle += escape_i * pi * 2 / 20;

                return [escape_angle, fork_angle, corrected_balance_angle];
            }

            function mainspring_values_s(arg) {


                function dfi(t) {


                    let f0 = -0.23;
                    f0 += Math.pow(sharp_step(0, 0.4, t), 0.1) * 0.23;

                    f0 += sharp_step(0.15, 1.0, t) * 0.011;
                    f0 += sharp_step(0.8, 1.0, t) * 0.01;



                    let f1 = -0.27;


                    f1 += Math.pow(t, 0.105) * 0.23
                    f1 += Math.pow(sharp_step(0.9, 0.97, t), 1) * 0.005;

                    let f = lerp(f0, f1, 1 - smooth_step(arg * 1.1 - 0.1, arg * 1.1, t));


                    if (arg < 0) {
                        f = f0 * (1 + arg * 2);
                    }

                    return f;
                }


                let step = 0.3894736842105263 * 1024 / mainspring_n;

                let values = new Array(mainspring_n + 1);

                let r0 = 1.2 + 0.06;
                values[0] = [r0, 0];
                values[1] = [r0, step];


                let fi = 0;
                for (let i = 2; i <= mainspring_n; i++) {

                    let t = i / mainspring_n;
                    let pp = values[i - 1];

                    fi += dfi(t);

                    values[i] = [pp[0] + step * Math.sin(fi),
                    pp[1] + step * Math.cos(fi)];
                }
                return values;
            }

            function mainspring_end_values(main_values) {
                let end_vals = new Array(mainspring_end_n + 1);

                for (let i = 0; i <= mainspring_end_n; i++) {
                    let p = main_values[mainspring_n - i - 4];
                    let l = vec_len(p);

                    end_vals[i] = vec_scale(p, (l - 0.12) / l);
                }

                return end_vals;
            }

            function mainspring_values(arg, ra) {


                function fr(t) {
                    let r0 = 1.2 + 0.06;

                    let ru = r0 + smooth_step(0, 0.03, t) * 2.3
                        + Math.pow(sharp_step(0.03, 0.93, t), 0.85) * (1.8)
                        + smooth_step(0.92, 0.94, t) * 0.2;

                    let rm = r0 + Math.pow(sharp_step(0.0, 1, t), 0.6394736842105263) * (10 * 0.42894736842105263)

                    let rw = r0 + Math.pow(sharp_step(0.0, 1, t), 0.64) * (0.7157894736842105 * 4.5)
                        - smooth_step(0.0, 0.015, t) * 0.07105263157894737
                        + smooth_step(0.9, 0.94, t) * (0.5894736842105263 * 1.95)

                    let r = (1 - arg) * (1 - arg) * ru + 2 * arg * (1 - arg) * rm + arg * arg * rw;

                    return r;
                }

                let step = 0.3894736842105263 * 1024 / mainspring_n;
                let fi = 0;
                for (let i = 0; i <= mainspring_n; i++) {
                    fi += step / fr(i / mainspring_n);
                }

                let kk = (mainspring_n - 200);
                let ddfi = -(fi + ra - 90) / kk;
                fi = 0;

                let values = new Array(mainspring_n + 1);
                for (let i = 0; i <= mainspring_n; i++) {

                    let rr = fr(i / mainspring_n);
                    let dfi = step / rr + ddfi;

                    if (i == kk)
                        ddfi = 0;

                    if (i == mainspring_n)
                        dfi = 90 - (fi + ra);

                    fi += dfi;

                    values[i] = [rr * Math.cos(fi), rr * Math.sin(fi)];
                }
                return values;
            }
        }

        if (animated)
            this.set_paused(false);

        if (load_text)
            document.fonts.load("10px IBM Plex Sans").then(function () { request_repaint() });

        window.addEventListener("resize", this.on_resize, true);
        window.addEventListener("load", this.on_resize, true);

        this.on_resize();
    }

    document.addEventListener("DOMContentLoaded", function (event) {

        function make_drawer(name, slider_count, args, sim_slider_index) {
            let ret = [];

            let drawer = new Drawer(document.getElementById(name), name);
            ret.push(drawer);

            if (slider_count === undefined)
                slider_count = 0;

            for (let i = 0; i < slider_count; i++) {
                let slider = new Slider(document.getElementById(name + "_sl" + i), function (x) {
                    if (i == 0)
                        drawer.set_arg0(x);
                    else if (i == 1)
                        drawer.set_arg1(x);
                    else if (i == 2)
                        drawer.set_arg2(x);
                }, undefined, args ? args[i] : 0.5, sim_slider_index != undefined);
                ret.push(slider);
            }


            if (sim_slider_index != undefined)
                drawer.set_sim_slider(ret[sim_slider_index + 1]);

            return ret;
        }

        make_drawer("hero", 1, [0]);
        make_drawer("hero_movement");

        make_drawer("gears_base");

        gears_base2 = make_drawer("gears_base2");
        gears_base2_seg = new SegmentedControl(document.getElementById("gears_base2_seg0"), function (x) {
            gears_base2[0].set_arg1(x);
        }, ["1:2", "1:1", "2:1"]);

        make_drawer("gears_base3", 1, [0]);

        make_drawer("mainspring_s", 1, [0.1], 0);
        make_drawer("mainspring_s2", 1, [0.1], 0);

        make_drawer("mainspring_barrel", 1, [0]);
        make_drawer("mainspring_arbor", 1, [0]);
        make_drawer("mainspring_arbor_hook", 1, [0]);
        make_drawer("mainspring_friction");
        make_drawer("mainspring_lid", 1, [0]);

        make_drawer("mainspring_wind0", 1, [0], 0);
        make_drawer("mainspring_wind1", 1, [0], 0);
        make_drawer("mainspring_wind2", 1, [0], 0);

        make_drawer("gear_train", 1);
        make_drawer("gear_train2", 1, [0], 0);
        let train2 = make_drawer("gear_train3");

        new SegmentedControl(document.getElementById("gear_train3_seg0"), function (x) {
            train2[0].set_arg0(x);
        }, ["Tick", "Tock"]);

        make_drawer("gear_train4", 1);
        make_drawer("gear_train5", 1, [0]);
        make_drawer("gear_train6");
        make_drawer("gear_train7", 1, [0.2]);

        make_drawer("coil_spring", 1, undefined, 0);
        make_drawer("torsion_spring", 1, undefined, 0);
        make_drawer("torsion_spring2", 1, undefined, 0);
        make_drawer("torsion_spring3", 3, undefined, 0);

        make_drawer("escapement_parts");
        make_drawer("escapement_action", 1);

        balance_wheel = make_drawer("balance_wheel", 1, [0.5], 0);

        make_drawer("main_plate");
        make_drawer("main_plate_gears", 1, [0]);
        make_drawer("main_plate_gears2", 1, [0]);


        make_drawer("pallet_fork_assembly", 1, [0]);
        make_drawer("pallet_fork_bridge_assembly", 1, [0]);
        make_drawer("pallet_fork_limits", 1);
        make_drawer("balance_assembly", 1, [0]);
        make_drawer("balance_assembly2", 2);
        make_drawer("balance_assembly3", 1, [0]);
        make_drawer("shock_protector", 1, [0], 0);

        make_drawer("balance_assembly_assembly", 1, [0]);

        make_drawer("stem_crown");
        make_drawer("winding_sliding_pinion", 1, [0]);
        make_drawer("sliding_pinion_rotation", 1);
        make_drawer("crown_stem_pinion_assembly", 1, [0]);

        make_drawer("arbor_spring_wind", 1, [0], 0);
        make_drawer("arbor_barrel_bridge", 1, [0]);
        make_drawer("arbor_ratchet_wheel", 1, [0]);
        make_drawer("arbor_ratchet_wheel_turn", 1, [0], 0);
        make_drawer("click_assembly", 1, [0]);
        make_drawer("click_rotation", 1);
        make_drawer("click_spring_flex", 1, [0.8], 0);
        make_drawer("click_spring_assembly", 1, [0]);
        make_drawer("click_rotation_spring", 1, [0.0], 0);
        make_drawer("crown_wheel_assembly", 1, [0]);

        make_drawer("cannon_pinion_assembly", 1, [0]);
        make_drawer("cannon_pinion_action", 1, [0]);


        make_drawer("hour_wheel_assembly", 1, [0]);
        make_drawer("hour_wheel_action", 1, [0]);

        make_drawer("date_assembly", 1, [0]);
        make_drawer("date_action", 1, [0]);
        make_drawer("date_flow");

        make_drawer("hour_wheel_time_set", 1);
        make_drawer("hour_wheel_time_set2", 1);

        make_drawer("corrector_setting_level_assembly", 1, [0]);
        make_drawer("corrector_setting_level_interaction", 1, [0]);
        make_drawer("corrector_setting_level_interaction1", 1, [0]);

        make_drawer("crown_stem_pinion_turn", 1, [0]);

        make_drawer("setting_wheel_asembly", 1, [0]);
        make_drawer("setting_wheel_interaction", 1, [0]);
        make_drawer("setting_wheel_sliding_pinion_interaction", 1);
        make_drawer("yoke_asembly", 1, [0]);
        make_drawer("yoke_interaction", 1, [0]);
        make_drawer("jumper_asembly", 1, [0]);
        make_drawer("jumper_interaction", 1, [0], 0);
        make_drawer("jumper_interaction2", 1, [0], 0);
        make_drawer("stop_lever_interaction", 1, [0], 0);

        make_drawer("crown_wheel_ccw");
        make_drawer("crown_wheel_cw");
        make_drawer("crown_wheel_go", 1, [0], 0);

        make_drawer("crown_wind", 1, [0]);
        make_drawer("crown_time_set", 1);
        make_drawer("crown_date_set_assembly", 1, [0]);
        make_drawer("crown_date_set", 1, [0]);

        make_drawer("minute_bridge_assembly", 1, [0]);
        make_drawer("automatic_assembly_base", 1, [0]);

        make_drawer("automatic_assembly", 1, [0]);
        make_drawer("automatic_gravity");
        make_drawer("automatic_behavior", 1);
        make_drawer("reversing_wheel_assembly", 1, [0]);
        make_drawer("reversing_wheel_interaction", 1, [0]);
        make_drawer("automatic_interaction", 1);

        make_drawer("credit_card_size", 1, [0]);

        make_drawer("jewel");

        if ("IntersectionObserver" in window) {
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {entry.target.drawer.set_visible(entry.isIntersecting);})
            }, {rootMargin: "100px"})

            all_containers.forEach(container => observer.observe(container));
        } else {
            all_containers.forEach(container => container.drawer.set_visible(true));
        }


        let gear_train5_container = document.getElementById("gear_train5");
        gear_train5_explainers = document.getElementsByClassName("gear_train5_explainer");

        for (let i = 0; i < gear_train5_explainers.length; i++)
            gear_train5_container.appendChild(gear_train5_explainers[i]);
    });
})();

function global_animate(animate) {

    for (var i = 0; i < animated_drawers.length; i++) {
        animated_drawers[i].set_paused(!animate);
    }

    if (animate) {
        document.getElementById("global_animate_on").classList.remove("hidden");
        document.getElementById("global_animate_off").classList.add("hidden");
    } else {
        document.getElementById("global_animate_on").classList.add("hidden");
        document.getElementById("global_animate_off").classList.remove("hidden");
    }
}

function gears_base2_f0() {
    gears_base2[0].set_arg0(2);
    gears_base2_seg.set_selection(2);
}

function balance_wheel_f0() {
    balance_wheel[0].set_rot(mat3_mul(rot_x_mat3(5.4), rot_z_mat3(-2.4)));
}
