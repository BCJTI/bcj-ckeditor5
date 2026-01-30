import {
	AccessibilityHelp,
	Alignment,
	AutoImage,
	AutoLink,
	Autoformat,
	Autosave,
	BlockQuote,
	Bold,
	ClassicEditor,
	Code,
	CodeBlock,
	Essentials,
	FindAndReplace,
	// FontBackgroundColor,
	FontColor,
	FontFamily,
	FontSize,
	GeneralHtmlSupport,
	Heading,
	Highlight,
	HorizontalLine,
	Image,
	ImageCaption,
	ImageInsert,
	ImageResize,
	ImageStyle,
	ImageToolbar,
	ImageUpload,
	Indent,
	IndentBlock,
	Italic,
	Link,
	List,
	ListProperties,
	MediaEmbed,
	// PageBreak,
	Paragraph,
	PictureEditing,
	Plugin,
	RemoveFormat,
	SelectAll,
	SourceEditing,
	SpecialCharacters,
	SpecialCharactersArrows,
	SpecialCharactersCurrency,
	SpecialCharactersEssentials,
	SpecialCharactersLatin,
	SpecialCharactersMathematical,
	SpecialCharactersText,
	Strikethrough,
	Style,
	Subscript,
	Superscript,
	Table,
	TableCaption,
	TableCellProperties,
	TableColumnResize,
	TableProperties,
	TableToolbar,
	TextTransformation,
	TodoList,
	Underline,
	Undo,
	// WordCount,
} from 'ckeditor5';

import 'ckeditor5/ckeditor5.css';

import './style.css';

function toHexColor( value ) {
	if ( typeof value !== 'string' ) {
		return value;
	}

	const normalized = value.trim().toLowerCase();

	if ( normalized.startsWith( '#' ) ) {
		return normalized;
	}

	const rgbMatch = normalized.match( /^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)(?:\s*,\s*([\d.]+))?\s*\)$/ );
	if ( rgbMatch ) {
		const r = Math.max( 0, Math.min( 255, Math.round( Number( rgbMatch[ 1 ] ) ) ) );
		const g = Math.max( 0, Math.min( 255, Math.round( Number( rgbMatch[ 2 ] ) ) ) );
		const b = Math.max( 0, Math.min( 255, Math.round( Number( rgbMatch[ 3 ] ) ) ) );
		return `#${ [ r, g, b ].map( c => c.toString( 16 ).padStart( 2, '0' ) ).join( '' ) }`;
	}

	const hslMatch = normalized.match( /^hsla?\(\s*([\-\d.]+)\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%(?:\s*,\s*([\d.]+))?\s*\)$/ );
	if ( hslMatch ) {
		let h = Number( hslMatch[ 1 ] );
		const s = Math.max( 0, Math.min( 100, Number( hslMatch[ 2 ] ) ) ) / 100;
		const l = Math.max( 0, Math.min( 100, Number( hslMatch[ 3 ] ) ) ) / 100;

		h = ( ( h % 360 ) + 360 ) % 360;

		const c = ( 1 - Math.abs( 2 * l - 1 ) ) * s;
		const x = c * ( 1 - Math.abs( ( h / 60 ) % 2 - 1 ) );
		const m = l - c / 2;

		let r1 = 0;
		let g1 = 0;
		let b1 = 0;

		if ( h < 60 ) {
			r1 = c;
			g1 = x;
		} else if ( h < 120 ) {
			r1 = x;
			g1 = c;
		} else if ( h < 180 ) {
			g1 = c;
			b1 = x;
		} else if ( h < 240 ) {
			g1 = x;
			b1 = c;
		} else if ( h < 300 ) {
			r1 = x;
			b1 = c;
		} else {
			r1 = c;
			b1 = x;
		}

		const r = Math.max( 0, Math.min( 255, Math.round( ( r1 + m ) * 255 ) ) );
		const g = Math.max( 0, Math.min( 255, Math.round( ( g1 + m ) * 255 ) ) );
		const b = Math.max( 0, Math.min( 255, Math.round( ( b1 + m ) * 255 ) ) );

		return `#${ [ r, g, b ].map( ch => ch.toString( 16 ).padStart( 2, '0' ) ).join( '' ) }`;
	}

	return value;
}


class TableColorHexNormalizer extends Plugin {
	static get pluginName() {
		return 'TableColorHexNormalizer';
	}

	init() {
		const editor = this.editor;
		const normalizedKeys = new Set( [
			'tableBorderColor',
			'tableBackgroundColor',
			'tableCellBorderColor',
			'tableCellBackgroundColor'
		] );

		editor.model.document.registerPostFixer( writer => {
			let changed = false;

			for ( const entry of editor.model.document.differ.getChanges() ) {
				if ( entry.type !== 'attribute' ) {
					continue;
				}

				if ( !normalizedKeys.has( entry.attributeKey ) ) {
					continue;
				}

				const item = entry.range && entry.range.start ? ( entry.range.start.nodeAfter || entry.range.start.parent ) : null;
				if ( !item || !item.is( 'element' ) ) {
					continue;
				}

				const currentValue = item.getAttribute( entry.attributeKey );
				const hexValue = toHexColor( currentValue );

				if ( typeof currentValue === 'string' && typeof hexValue === 'string' && currentValue !== hexValue ) {
					writer.setAttribute( entry.attributeKey, hexValue, item );
					changed = true;
				}
			}

			return changed;
		} );
	}
}

const editorConfig = {
	toolbar: {
		items: [
			'undo',
			'redo',
			'|',
			'sourceEditing',
			'|',
			'heading',
			'|',
			'findAndReplace',
			'selectAll',
			'|',
			'code',
			'codeBlock',
			'link',
			'insertImage',
			'insertTable',
			'blockQuote',
			'mediaEmbed',
			// 'pageBreak',
			'horizontalLine',
			'specialCharacters',
			'-',
			'bold',
			'italic',
			'underline',
			'strikethrough',
			'superscript',
			'subscript',
			'|',
			'fontFamily',
			'fontSize',
			'fontColor',
			// 'fontBackgroundColor',
			'highlight',
			// 'caseChange', need keys
			// 'formatPainter', need keys
			'removeFormat',
			'|',
			'alignment',
			'|',
			'bulletedList',
			'numberedList',
			// 'multilevelList', // premium
			'todoList',
			'|',
			'outdent',
			'indent',
			'|',
			// its a grouper, dropdown
			// {
			// 	label: 'Basic styles',
			// 	icon: 'text',
			// 	items: [
			// 		'fontSize',
			// 		'fontFamily',
			// 		'fontColor',
			// 		'fontBackgroundColor',
			// 		'highlight',
			// 		'superscript',
			// 		'subscript',
			// 		'code',
			// 		'|',
			// 		'textPartLanguage',
			// 		'|',
			// 	],
			// },
		],
		shouldNotGroupWhenFull: true,
	},
	fontFamily: {
		supportAllValues: true
	},
	fontColor: {
		colorPicker: { format: 'hex' }
	},
	fontBackgroundColor: {
		colorPicker: false,
	},
	fontSize: {
		options: [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
		supportAllValues: true
	},
	heading: {
		options: [
			{
				model: 'paragraph',
				title: 'Paragraph',
				class: 'ck-heading_paragraph'
			},
			{
				model: 'heading1',
				view: 'h1',
				title: 'Heading 1',
				class: 'ck-heading_heading1'
			},
			{
				model: 'heading2',
				view: 'h2',
				title: 'Heading 2',
				class: 'ck-heading_heading2'
			},
			{
				model: 'heading3',
				view: 'h3',
				title: 'Heading 3',
				class: 'ck-heading_heading3'
			},
			{
				model: 'heading4',
				view: 'h4',
				title: 'Heading 4',
				class: 'ck-heading_heading4'
			},
			{
				model: 'heading5',
				view: 'h5',
				title: 'Heading 5',
				class: 'ck-heading_heading5'
			},
			{
				model: 'heading6',
				view: 'h6',
				title: 'Heading 6',
				class: 'ck-heading_heading6'
			}
		]
	},
	htmlSupport: {
		allow: [
			{
				name: /^.*$/,
				styles: true,
				attributes: true,
				classes: true
			}
		]
	},
	image: {
		resizeOptions: [
			{
				name: 'resizeImage:original',
				label: 'Default image width',
				value: null,
			},
			{
				name: 'resizeImage:50',
				label: '50% page width',
				value: '50',
			},
			{
				name: 'resizeImage:75',
				label: '75% page width',
				value: '75',
			},
		],
		toolbar: [
			'imageTextAlternative',
			'toggleImageCaption',
			'|',
			'imageStyle:inline',
			'imageStyle:wrapText',
			'imageStyle:breakText',
			'|',
			'resizeImage',
		],
		insert: {
			integrations: ['url'],
		},
	},
	list: {
		properties: {
			styles: true,
			startIndex: true,
			reversed: true,
		},
	},
	link: {
		addTargetToExternalLinks: true,
		defaultProtocol: 'https://',
		decorators: {
			toggleDownloadable: {
				mode: 'manual',
				label: 'Downloadable',
				attributes: {
					download: 'file'
				}
			}
		}
	},
	menuBar: {
		isVisible: true
	},
	table: {
		contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties'],
		tableProperties: {
			colorPicker: { format: 'hex' }
		},
		tableCellProperties: {
			colorPicker: { format: 'hex' }
		}
	}
};

class Editor extends ClassicEditor {}

Editor.builtinPlugins = [
	AccessibilityHelp,
	Alignment,
	Autoformat,
	AutoImage,
	AutoLink,
	Autosave,
	BlockQuote,
	Bold,
	Code,
	CodeBlock,
	Essentials,
	FindAndReplace,
	// FontBackgroundColor,
	FontColor,
	FontFamily,
	FontSize,
	GeneralHtmlSupport,
	Heading,
	Highlight,
	HorizontalLine,
	Image,
	ImageCaption,
	ImageInsert,
	ImageResize,
	ImageStyle,
	ImageToolbar,
	ImageUpload,
	Indent,
	IndentBlock,
	Italic,
	Link,
	List,
	ListProperties,
	MediaEmbed,
	// PageBreak,
	Paragraph,
	PictureEditing,
	RemoveFormat,
	SelectAll,
	SourceEditing,
	SpecialCharacters,
	SpecialCharactersArrows,
	SpecialCharactersCurrency,
	SpecialCharactersEssentials,
	SpecialCharactersLatin,
	SpecialCharactersMathematical,
	SpecialCharactersText,
	Strikethrough,
	Style,
	Subscript,
	Superscript,
	Table,
	TableCaption,
	TableCellProperties,
	TableColumnResize,
	TableProperties,
	TableToolbar,
	TableColorHexNormalizer,
	TextTransformation,
	Underline,
	TodoList,
	Undo,
	// WordCount, // the row with infos must be done manually
];

Editor.defaultConfig = editorConfig;

export default Editor;
