import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '@ckeditor/ckeditor5-build-classic/build/translations/vi';

function TestTable() {
    const [editorData, setEditorData] = useState('<p>Hello from CKEditor 5 in React!</p>');

    return (
        <div>
            <CKEditor
                editor={ClassicEditor}
                data={editorData}
                onReady={(editor) => {
                    console.log('Editor is ready to use!', editor);
                }}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    console.log({ event, editor, data });
                    setEditorData(data);
                }}
                config={{
                    toolbar: [
                        'undo', 'redo', '|', 'bold', 'italic', '|', 'insertTable'
                    ],
                    plugins: [
                        'Essentials', 'Paragraph', 'Bold', 'Italic', 'Undo', 'Table', 'TableToolbar', 'Mention', 'SlashCommand'
                    ],
                    language: 'vi',
                    table: {
                        contentToolbar: [ 'tableColumn', 'tableRow', 'mergeTableCells' ]
                    },
                    mention: { 
                        // Mention configuration
                    },
                    // licenseKey: '<YOUR_LICENSE_KEY>',
                }}
            />
        </div>
    );
}

export default TestTable;
