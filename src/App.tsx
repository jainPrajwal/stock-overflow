import React, { useState } from 'react';
import logo from './logo.svg';
import parse from 'html-react-parser';
import { CKEditor } from '@ckeditor/ckeditor5-react';



import './App.css';
import Editor from 'ckeditor5-custom-build/build/ckeditor';


// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
const editorElement = document.querySelector('#editor') as HTMLElement;

const editorConfiguration = {
    toolbar: {
        items: [
            'heading',
            '|',
            'fontColor',
            'fontBackgroundColor',
            'fontFamily',
            'fontSize',
            'bold',
            'italic',
            'link',
            'bulletedList',
            'numberedList',
            '|',
            'outdent',
            'indent',
            '|',
            'code',
            'codeBlock',
            'imageUpload',
            'blockQuote',
            'mediaEmbed',
            'undo',
            'redo'
        ]
    },
};


function App() {
    const [answer, setAnswer] = useState<string | null>(null);
    return (
        <div className="App">
            <h2>Using CKEditor 5 from online builder in React</h2>
            <CKEditor
                editor={Editor}
                config={editorConfiguration}
                data="<p>Hello from CKEditor 5!</p>"
                onReady={editor => {
                    // You can store the "editor" and use when it is needed.
                    console.log('Editor is ready to use!', editor);
                }}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    console.log({ event, editor, data });
                }}
                onBlur={(event, editor) => {
                    console.log('Blur.', editor);
                }}
                onFocus={(event, editor) => {
                    console.log('Focus.', editor);
                }}
            />
        </div>
    );
}

export default App;
