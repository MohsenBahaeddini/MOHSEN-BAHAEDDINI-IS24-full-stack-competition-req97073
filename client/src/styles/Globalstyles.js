import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`

:root {
    --font-heading:'Noto Sans','Work Sans','Signika Negative','Comfortaa',  'Spectral', 'Play', sans-serif;
	--font-body:  'Noto Sans','Work Sans', 'Signika Negative', 'Comfortaa','Spectral','Archivo', sans-serif;
	--color-blue: #3f5efb;
	--color-green: #76FC46;

}


//CSS RESET

/* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
*/

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	line-height: 30px;
	font-family: var(--font-body);
	vertical-align: baseline;
}
input, button{
    font-family: var(--font-body);
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
html, body {
    height: 100%;
}
body {
	line-height: 1;
    height: 100vh;
    background-color: #F1F1E6;
   
}
#root {
    height: 100%;
    display: flex;
    flex-direction: column;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}

`;
