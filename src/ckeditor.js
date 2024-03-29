/**
 * @license Copyright (c) 2014-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor.js';
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment.js';
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat.js';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote.js';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold.js';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials.js';
import FontBackgroundColor from '@ckeditor/ckeditor5-font/src/fontbackgroundcolor.js';
import FontColor from '@ckeditor/ckeditor5-font/src/fontcolor.js';
import FontFamily from '@ckeditor/ckeditor5-font/src/fontfamily.js';
import FontSize from '@ckeditor/ckeditor5-font/src/fontsize.js';
import Heading from '@ckeditor/ckeditor5-heading/src/heading.js';
import HorizontalLine from '@ckeditor/ckeditor5-horizontal-line/src/horizontalline.js';
import Indent from '@ckeditor/ckeditor5-indent/src/indent.js';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic.js';
import Link from '@ckeditor/ckeditor5-link/src/link.js';
import List from '@ckeditor/ckeditor5-list/src/list.js';
import ListStyle from '@ckeditor/ckeditor5-list/src/liststyle.js';
import MathType from '@wiris/mathtype-ckeditor5';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph.js';
import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice';
import RemoveFormat from '@ckeditor/ckeditor5-remove-format/src/removeformat.js';
import Table from '@ckeditor/ckeditor5-table/src/table.js';
import TableCellProperties from '@ckeditor/ckeditor5-table/src/tablecellproperties';
import TableProperties from '@ckeditor/ckeditor5-table/src/tableproperties';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar.js';
import TextTransformation from '@ckeditor/ckeditor5-typing/src/texttransformation.js';
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline.js';

class Editor extends ClassicEditor {}

// Plugins to include in the build.
Editor.builtinPlugins = [
	Alignment,
	Autoformat,
	BlockQuote,
	Bold,
	Essentials,
	FontBackgroundColor,
	FontColor,
	FontFamily,
	FontSize,
	Heading,
	HorizontalLine,
	Indent,
	Italic,
	Link,
	List,
	ListStyle,
	MathType,
	Paragraph,
	PasteFromOffice,
	RemoveFormat,
	Table,
	TableCellProperties,
	TableProperties,
	TableToolbar,
	TextTransformation,
	Underline
];

const tb = {
	alignment: 'alignment',
	selectAll: 'selectAll',
	undo: 'undo',
	redo: 'redo',
	bold: 'bold',
	chemType: 'chemType',
	italic: 'italic',
	blockQuote: 'blockQuote',
	ckfinder: 'ckfinder',
	imageTextAlternative: 'imageTextAlternative',
	imageUpload: 'imageUpload',
	heading: 'heading',
	horizontalLine: 'horizontalLine',
	imageStyle: {
		full: 'imageStyle:full',
		side: 'imageStyle:side',
	},
	indent: 'indent',
	outdent: 'outdent',
	link: 'link',
	mathType: 'mathType',
	mediaEmbed: 'mediaEmbed',
	numberedList: 'numberedList',
	bulletedList: 'bulletedList',
	insertTable: 'insertTable',
	removeFormat: 'removeFormat',
	tableColumn: 'tableColumn',
	tableRow: 'tableRow',
	mergeTableCells: 'mergeTableCells',
	underline: 'underline',
	// Font Plugin
	fontFamily: 'fontFamily',
	fontSize: 'fontSize',
	fontColor: 'fontColor',
	fontBackgroundColor: 'fontBackgroundColor',
};

Editor.defaultConfig = {
	fontSize: {
		options: [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
		supportAllValues: true,
	},
	toolbar: [
		tb.heading,
		'|', tb.undo, tb.redo,
		'|', tb.fontFamily, tb.fontSize, tb.fontColor, tb.fontBackgroundColor,
		'|', tb.bold, tb.italic, tb.underline, tb.link, tb.bulletedList, tb.numberedList, tb.alignment,
		'|', tb.indent, tb.outdent, tb.horizontalLine,
		'|', tb.removeFormat, tb.blockQuote, tb.insertTable, tb.mathType, tb.chemType
	],
};

export default Editor;
