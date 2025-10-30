import React, { useMemo } from 'react';
import TextBox from '../../components/base/textbox';
import Button from '../../components/base/button';
import { ReactFlow, Background, Controls } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import useGenerateJSON from '../../hooks/useGenerateJSON';
import SearchCache from '../../utils/search-cache';

const Home: React.FC = () => {
    const jsonInputRef = React.useRef<HTMLTextAreaElement>(null);
    const [searchNodeId, setSearchNodeId] = React.useState<string | null>(null);
    const searchCache = useMemo(() => new SearchCache(), []);
    const { flowObject, generateFlowFromJSON } = useGenerateJSON(searchCache);
    const [searchResultMessage, setSearchResultMessage] = React.useState<string>('');


    const handleGenerateJSON = () => {
        try {
            const jsonObject = JSON.parse(jsonInputRef.current?.value || '{}');
            generateFlowFromJSON(jsonObject);
            console.log('Generated JSON:', jsonObject);
        } catch (error) {
            console.error('Invalid JSON:', error);
        }
    };

    console.log('Flow Object:', flowObject);

    return (
        <div className='p-2' >
            <h1 className='text-2xl font-bold mb-2' > JSON Buddy</h1>
            <TextBox.TextArea
                ref={jsonInputRef}
                className='h-48 w-full'
                error=''
                placeholder='{\n "key": "value"   \n}'
                label='Enter the JSON data'
            />
            <Button className='mt-2' onClick={handleGenerateJSON} >
                Generate JSON
            </Button>

            <div className='mt-4' >
                <TextBox.Input
                    className='w-full'
                    error=''
                    placeholder='Search...'
                    label='Search JSON Key'
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const val = e.target.value;
                        console.log('Search Path:', val);
                        console.log("Search Cache:", searchCache.get(val));
                        setSearchNodeId(searchCache.get(val) || null);
                        if (val === '') {
                            setSearchResultMessage('');
                        } else if (searchCache.get(val)) {
                            setSearchResultMessage('Node found!');
                        } else {
                            setSearchResultMessage('Node not found.');
                        }
                        // setJsonSearchPath(val);
                    }}
                    caption={searchResultMessage}

                />
            </div>

            <div className='mt-4 h-96 border' >
                <ReactFlow
                    nodes={flowObject.nodes.map(node => ({
                        ...node,
                        style: {
                            ...node.style,
                            ...(node.id === searchNodeId && {
                                background: '#FFD700',
                                border: '3px solid #FFA500',
                                boxShadow: '0 0 10px rgba(255, 165, 0, 0.8)',
                            })
                        }
                    }))}
                    edges={flowObject.edges}
                    fitView
                >
                    <Background />
                    <Controls />
                </ReactFlow>
            </div>
        </div>
    );
}

export default Home;