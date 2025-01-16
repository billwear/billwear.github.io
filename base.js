html {
    height: 100%;
    width: 100%;
}

body {
    padding: 0;
    margin: 0;
    background: #F8F8F8;
    color: #444;
    height: 100%;
    width: 100%;
    font-family: "IBM Plex Sans", "Helvetica Neue", Arial, sans-serif !important;
    -webkit-text-size-adjust: 100%;
}

#main_container {
    min-height: 100%;
    position: relative;
}

#body {
    padding-bottom: 6em;
}

#footer {
    margin: 0px auto;
    text-align: center;
    font-size: 0.9em;
    color: #ccc;
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;
    right: 0;
    height: 6em;
    line-height: 7em;
}

.article_footer {
    margin: 1.2em auto;
    height: 2em;
    text-align: center;
    color: #ccc;
}

.article_footer a {
    color: #bbb;
}

#banner_wrapper,
#content,
.bg_content,
.pagination,
.archive {
    margin: 0 auto;
}

.article>*,
#archive,
.padding_wrapper {
    max-width: 44rem;
    margin-left: auto;
    margin-right: auto;
    padding-left: 3rem;
    padding-right: 3rem;
}

#banner_wrapper,
.bg_content,
.pagination {
    max-width: 44rem;
    padding: 0 3em 0 3em;
}

#banner_content {
    margin: 0;
}

#banner {
    width: 100%;
    background: #2052BB;
    padding: 0 0 0.7em 0;
    overflow: hidden;
    font-optical-sizing: auto;
}

#site_title {
    padding: 1em 0 0.5em 0;
    font-size: 2.8em;
    font-family: "Inter", "Helvetica Neue", Arial, sans-serif;
    font-optical-sizing: auto;
}

#site_title a {
    color: #F8F8F8;
    text-decoration: none;
    font-weight: 600;
}

#navigation {
    float: left;
    padding: 0.3em 0;
}

#navigation a {
    font-size: 1.0em;
    line-height: 1.5em;
    padding-right: 1.5em;
    text-decoration: none;
    color: #F8F8F8;
    transition: 0.15s;
    transition-property: opacity;
    opacity: 0.75;
}

#navigation a:visited {
    color: #F8F8F8;
}

#social {
    float: right;
    margin: 0;
    padding: 0;
}

#social a {
    margin: 0 0px;
    display: inline-block;
    text-indent: -9999px;
    width: 34px;
    height: 34px;
    transition: 0.15s;
    transition-property: opacity;
    opacity: 0.75;
    overflow: hidden;
    letter-spacing: -0.31em;
}

#navigation a:hover,
#social a:hover {
    opacity: 1.0;
}

#social a div {
    width: 34px;
    height: 34px;
    background: url('/images/social/icons.png') center no-repeat;
    background-size: 160px 32px;
}

#social a .patreonLogo {
    background-position: 1px 1px;
}

#social a .twitterLogo {
    background-position: -31px 1px;
}

#social a .igLogo {
    background-position: -63px 1px;
}

#social a .emailLogo {
    background-position: -95px 1px;
}

#social a .rssLogo {
    background-position: -127px 1px;
}

b,
strong {
    font-weight: 500;
}

h1,
h2,
h3,
h4,
h5,
h6,
.archive_year,
.archive_link {
    color: #535353;
    text-decoration: none;
    font-weight: 600;
    font-optical-sizing: auto;
    font-style: normal;
    font-family: "Inter", "Helvetica Neue", Arial, sans-serif;
    margin: 0;
    padding: 0.75em 0 0.25em 0;
}

h1 {
    font-size: 1.8em;
}

h2 {
    font-size: 1.5em;
}

h3 {
    font-size: 1.3em
}

h4 {
    font-size: 1em
}

h5 {
    font-size: .9em
}

h6 {
    font-size: .8em
}

p code,
li code {
    display: inline-block;
    white-space: no-wrap;
    background: #eaeaea;
    font-size: .8em;
    font-weight: bold;
    line-height: 1.5em;
    color: #555;
    border-radius: 0.4em;
    padding: 0 .4em;
    margin: 0em 0.13em;
    font-family: Menlo, Monaco, "Andale Mono", "lucida console", "Courier New", monospace;
    vertical-align: baseline;
}

.article {
    margin: 3em 0;
    padding-bottom: 3em;
}

.article a:visited {
    color: #356082;
}

.article a {
    color: #0181eb;
    text-underline-offset: 0.1em;
    text-decoration-thickness: 0.06em;
    transition: color 0.15s;
}

.article a:hover {
    color: #2794ee;
}

.article a.link_button {
    color: #CA9839;
}

p {
    margin: 0;
    padding: 0.7em 0;
}

.article p {
    overflow-x: hidden;
    overflow-y: hidden;
}

.article .img_container {
    padding: 2em 0 1em 0;
    margin: 0 auto;
    display: block;
    text-align: center;
}

.article .img_border {
    padding: 0;
    max-width: 100%;
    border-radius: 10px;
    box-shadow: #eaeaea 0 0 0px 3px;
    border: #fff 15px solid;
    background: #fff;
    display: inline-block;
}

.article img {
    max-width: 100%;
    height: auto;
    padding: 0;
    margin: 0;
    display: block;
}

.article sup {
    vertical-align: top;
    font-size: 0.6em;
    position: relative;
    top: -0.5em;
}

.article sub {
    vertical-align: bottom;
    font-size: 0.6em;
    position: relative;
    bottom: -0.5em;
}

.article ul {
    padding: 0.6em 0 0.6em 3em;
    margin: 0 auto;
}

.article ul li,
.article ol li {
    padding: 0.3em 0;
    margin-left: 2em;
}

.article ol {
    padding: 0 0 0 3em;
}

.article li,
.article p,
.article .img_container {
    font-size: 1.2em;
    line-height: 1.6em;
}

.article .img_container span {
    margin: 0 auto;
    text-align: center;
    font-size: .8em;
    color: #555;
    display: block;
}

.move_cursor {
    cursor: move;
}

.segmented_container {
    max-width: 500px;
    margin: 0 auto;
}

.slider_container {
    margin: 0 auto;
    padding: 25px 0 25px 0;
    width: 90%;
    max-width: 380px;
}

.long_slider .slider_container {
    max-width: 600px;
}

.slider_left_gutter,
.slider_right_gutter,
.slider_knob {
    background: #777;
}

.slider_left_gutter,
.slider_right_gutter {
    position: absolute;
    height: 4px;
    top: 18px;
    border-radius: 2px;
}

.slider_knob {
    position: absolute;
    width: 40px;
    height: 40px;
    border-radius: 20px;
    cursor: grab;
    touch-action: none;
}


.slider_knob:active {
    cursor: grabbing;
}

.slider_left_gutter,
.slider_right_gutter {
    top: -2px;
}

.slider_right_gutter {
    opacity: 0.2;
}

.slider_knob {
    left: -20px;
    top: -20px;
}

.post_title {
    font-size: 2.4em;
    padding-top: 0.4em;
}

.post_title a {
    color: #535353;
    text-decoration: none;
    font-weight: 600;
}

.post_title a:visited {
    color: #535353;
}

.post_title a:hover {
    color: #777;
}

.post_date,
.archive_date {
    color: #aaa;
    padding-bottom: 0.2em;
}

.highlight,
pre {
    margin: 0 auto;
    font-size: 1.05em;
}

.highlight>pre.chroma,
.highlight>div.chroma {
    padding: 0.5em;
    overflow-y: hidden;
    overflow-x: scroll;
    -webkit-overflow-scrolling: touch;
}

.highlight {
    margin: 1em auto;
    padding: 0em;
    background-color: #fff;
    border-radius: 8px;
    border: #eaeaea 2px solid;
}

blockquote {
    margin-left: 2.5em;
    padding-left: 1em;
    font-style: italic;
    position: relative;
    border-left: #eaeaea 4px solid;
}

.sqrt {
    position: relative;
    margin-left: 12px;
}

.sqrt:after {
    position: absolute;
    content: '';
    width: 25px;
    left: -12px;
    top: 0px;
    height: 23px;
    background-image: url('../images/sqrt.svg');
}

.drawer_container {
    width: 100%;
    height: auto;
    position: relative;
    margin: 2.3em auto 2em auto;
    padding: 0;
    user-select: none;
}

.drawer_container:after {
    padding-top: 66%;
    display: block;
    content: '';
}

.full_width {
    max-width: 100%;
}

.ratio_20:after {
    padding-top: 20%;
}

.ratio_25:after {
    padding-top: 25%;
}

.ratio_30:after {
    padding-top: 30%;
}

.ratio_40:after {
    padding-top: 40%;
}

.ratio_50:after {
    padding-top: 50%;
}

.ratio_60:after {
    padding-top: 60%;
}

.ratio_70:after {
    padding-top: 70%;
}

.ratio_80:after {
    padding-top: 80%;
}

.ratio_90:after {
    padding-top: 90%;
}

.ratio_100:after {
    padding-top: 100%;
}

.ratio_110:after {
    padding-top: 110%;
}

.ratio_120:after {
    padding-top: 120%;
}

.ratio_130:after {
    padding-top: 130%;
}

table {
    font-size: 1.2em;
    line-height: 1.6em;
    margin: 1em auto;
    border-collapse: collapse;
}

td {
    padding: 0 0.5em;
}

.hanchor {
    font-size: 100%;
    visibility: hidden;
}

h1:hover a,
h2:hover a,
h3:hover a,
h4:hover .hanchor,
h5:hover .hanchor {
    visibility: visible;
}

.hanchor img {
    display: inline;
    vertical-align: middle;
    padding: 0.0em 0.2em;
}

.hidden {
    display: none;
}

.nobreak {
    white-space: nowrap;
}

.click_word {
    display: initial;
}

.tap_word {
    display: none;
}

.rounded_bg {
    position: relative;
    padding: -0.2em 0.3em;
    border-radius: 0.2em;
    background: #eee;
    margin: 0.0em 0.05em;
}

.dotted {
    background-image: linear-gradient(to right, rgba(68, 68, 68, 1) 50%, rgba(68, 68, 68, 0) 0%);
    background-position: 0px 1.15em;
    background-size: 4px 2px;
    background-repeat: repeat-x;
}

.move_cursor {
    cursor: move;
}

.drag_div {
    position: absolute;
    cursor: move;
}

.metric_word {
    display: initial;
}

.unit_switch {
    position: relative;
    padding: 0.0em 1.8em 0em 0.4em;
    line-height: 1.4em;
    border-radius: 0.3em;
    background: rgba(255, 255, 255, 0.2);
    margin: 0.0em 0.05em;
    cursor: pointer;
    display: inline-block;
    white-space: nowrap;
    box-shadow: rgba(0, 0, 0, 0.2) 0 0 2px 0px;
    transition: 0.15s;
}


.unit_switch::after {
    box-sizing: border-box;
    background: rgba(132, 143, 147, 0.9);
    color: rgba(255, 255, 255, 0.9);
    border-radius: 0 0.35em 0.35em 0;
    display: inline-block;
    position: absolute;
    user-select: none;
    content: "↑↓";
    font-weight: 500;
    font-size: 0.8em;
    padding: 0;
    margin: 0;
    letter-spacing: -0.3em;
    padding-right: 0.3em;
    text-align: center;
    line-height: 1.75em;
    width: 1.75em;
    height: 1.75em;
    top: 0;
    right: 0;
    transition: 0.1s;
}

.unit_switch:hover {
    background: rgba(225, 225, 225, 0.2);
}

.unit_switch:hover::after {
    background: rgba(113, 122, 126, 0.9);
    color: rgba(236, 236, 236, 0.9);
}




.imperial_word {
    display: none;
}

.show_imperial .metric_word {
    display: none;
}

.show_imperial .imperial_word {
    display: inline-block;
}

.non_selectable {
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -khtml-user-select: none;
    -ms-user-select: none;
}

.equation {
    font-size: 1.42em;
    font-weight: 500;
    overflow-x: auto;
    overflow-y: visible;
    margin: -0.5em auto;
    text-align: center;
    padding: 1.5em 1em;
    line-height: 1.8em;
    white-space: nowrap;
}

.equation span {
    display: inline-block;
}

.equation_frac {
    display: inline-block;
    position: relative;
    vertical-align: middle;
    letter-spacing: 0.001em;
    text-align: center;
}

.equation_frac span {
    display: inline-block;
}

.equation_frac>span {
    display: block;
    margin-top: -0.3em;
    margin-bottom: -0.1em;
}

span.equation_div_symbol {
    font-size: 0;
    display: block;
    height: 2px;
    width: 100%;
    background: #444;
}

.play_pause_button,
.restart_button,
.undo_button {
    position: absolute;
    width: 44px;
    height: 44px;
    bottom: 0px;
    left: 0px;
    background-image: url('/images/play_pause.png');
    background-repeat: no-repeat;
    background-size: 132px 44px;
    background-position: -44px 0px;
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.05);
    border-radius: 6px;
    touch-action: manipulation;
}

.undo_button {
    background-image: url('/images/undo.png');
    background-size: 44px 44px;
    background-position: 0px 0px;
}

.play_pause_button.white,
.restart_button.white {
    background-image: url('/images/play_pause_white.png');
    background-color: rgba(255, 255, 255, 0.05);
}

.play_pause_button:hover,
.restart_button:hover,
.undo_button:hover {
    opacity: 0.8;
}

.restart_button {
    background-position: -88px 0px;
}

.play_pause_button.playing {
    background-position: 0px 0px;
}

.segmented_control_container {
    background: #ddd;
    height: 40px;
    position: relative;
    border-radius: 10px;
    margin-bottom: 2em;
}

.segmented_control_on,
.segmented_control_off {
    position: absolute;
    text-align: center;
    border-radius: 7px;
    height: 36px;
    cursor: pointer;
    font-size: 20px;
    line-height: 36px;
    text-align: center;
    font-weight: 500;
}

.segmented_control_on {
    background: #F8F8F8;
}

.segmented_control_off:hover {
    background: #e8e8e8;
}

.dark .segmented_control_container {
    background: #111;
}

.dark .segmented_control_on {
    background: #272727;
}

.dark .segmented_control_off:hover {
    background: #2c2c2c;
}

@media (pointer:coarse) {
    .click_word {
        display: none;
    }

    .tap_word {
        display: initial;
    }
}

@media (hover: none) {
    .hanchor {
        display: none;
    }
}

.pagination {
    position: relative;
    padding: 2em 0;
    text-decoration: none;
}

.pagination a,
.pagination a:visited {
    padding: 0 1em;
    color: #888;
    text-decoration: none;
}

.pagination a:hover {
    color: #aaa;
    text-decoration: none;
}

.pagination .older_entries {
    position: absolute;
    left: 0;
}

.pagination .newer_entries {
    position: absolute;
    right: 0;
}

.canvas_container {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}

.medium_drawer {
    max-width: 600px;
}

.small_drawer {
    max-width: 400px;
}

.square_drawer:after {
    padding-top: 100%;
}

@media only screen and (max-width: 760px) {
    #site_title {
        font-size: 2.5em;
    }
}

@media only screen and (max-width: 450px) {

    #banner_wrapper,
    .bg_content {
        padding: 0 1.2em;
    }

    .article>*,
    #archive {
        padding-left: 1.2rem;
        padding-right: 1.2rem;
    }

    .padding_wrapper {
        padding-left: 1.2rem;
        padding-right: 1.2rem;
    }

    .article ul {
        padding-left: 2em;
    }

    #social a {
        margin: 0 -3px;
    }

    p {
        font-size: 1.1em;
        line-height: 1.6em;
    }

    .article .img_border {
        border: #fff 10px solid;
    }

    blockquote {
        margin-left: 1.0em;
    }

    .segmented_control_on,
    .segmented_control_off {
        font-size: 18px;
    }
}

@media only screen and (max-width: 350px) {
    p {
        font-size: 1.0em;
        line-height: 1.6em;
    }

    #navigation a {
        padding-right: 1em;
    }

    #social a {
        margin: 0 -5px;
    }

    #banner_wrapper,
    .bg_content {
        padding: 0 1em;
    }

    .article>*,
    #archive {
        padding-left: 1rem;
        padding-right: 1rem;
    }

    .padding_wrapper {
        padding-left: 1rem;
        padding-right: 1rem;
    }

    .segmented_control_on,
    .segmented_control_off {
        font-size: 16px;
    }
}

@media only screen and (max-width: 520px) {
    .slider_container {
        max-width: 320px;
    }

    .long_slider .slider_container {
        max-width: 320px;
    }
}

@media only screen and (max-width: 420px) {
    .slider_container {
        max-width: 300px;
    }

    .long_slider .slider_container {
        max-width: 300px;
    }
}

@media only screen and (max-width: 360px) {
    .slider_container {
        max-width: 260px;
    }

    .long_slider .slider_container {
        max-width: 260px;
    }
}
