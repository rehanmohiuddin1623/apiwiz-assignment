import React from 'react';
import type { Edge, Node } from '@xyflow/react';
import type { SearchCacheInterface } from '../utils/search-cache';

const useGenerateJSON = (searchCache: any) => {
    const [flowObject, setFlowObject] = React.useState<{ nodes: Node[]; edges: Edge[] }>({ nodes: [], edges: [] });

    const getNodeClassName = (value: any) => {
        const nodeType = Array.isArray(value) ? 'array' : typeof value;
        switch (nodeType) {
            case 'object':
                return {
                    background: '#e0f7fa',
                };
            case 'array':
                return {
                    background: '#c8e6c9',
                };
            default:
                return {
                    background: '#f0f0f0',
                };
        }
    }


    const generateFlowFromJSON = (jsonInput: JSON) => {
        const nodes: Node[] = [];
        const edges: Edge[] = [];
        const childCounts: Record<string, number> = {}; // Track children count per parent

        // Configuration for layout
        const VERTICAL_SPACING = 120;
        const HORIZONTAL_SPACING = 200;
        const ROOT_X = 400;

        // Calculate position directly during traversal
        const calculatePosition = (parentId: string, parentPosition: { x: number; y: number } | null, level: number) => {
            const y = level * VERTICAL_SPACING;

            if (!parentPosition) {
                // Root node
                return { x: ROOT_X, y };
            }

            // Initialize child count for parent if not exists
            if (!childCounts[parentId]) {
                childCounts[parentId] = 0;
            }

            const childIndex = childCounts[parentId]++;
            const parentX = parentPosition.x;

            let x: number;

            if (childIndex === 0) {
                // First child - place to the left
                x = parentX - HORIZONTAL_SPACING;
            } else if (childIndex === 1) {
                // Second child - place to the right
                x = parentX + HORIZONTAL_SPACING;
            } else {
                // Additional children - alternate further left and right
                const isEven = childIndex % 2 === 0;
                const multiplier = Math.floor(childIndex / 2) + 1;
                x = isEven ?
                    parentX - (HORIZONTAL_SPACING * multiplier) :
                    parentX + (HORIZONTAL_SPACING * multiplier);
            }

            return { x, y };
        };

        // Transform JSON into nodes and edges with proper positioning
        const traverse = (
            obj: any,
            parentId: string | null = null,
            parentPosition: { x: number; y: number } | null = null,
            level: number = 0,
            key: string = "root",
            path: string = "$"
        ) => {
            const id = `${Date.now()}-${Math.random()}`; // Unique ID for each node
            const position = calculatePosition(parentId || "", parentPosition, level);

            // Determine node label
            let label = key;
            if (obj && typeof obj === 'object' && obj.name) {
                label = obj.name;
            } else if (key === "root") {
                label = "Root";
            }

            // Add node
            nodes.push({
                id,
                data: { label },
                position,
                style: getNodeClassName(obj)
            });

            // Store the full path in cache
            searchCache.set(path, id);
            console.log(`Mapping path "${path}" to node ID "${id}"`);

            // Add edge if not root
            if (parentId) {
                edges.push({
                    id: `${parentId}-${id}`,
                    source: parentId,
                    target: id
                });
            }

            // Process children
            if (obj && typeof obj === 'object' && !Array.isArray(obj)) {
                for (const childKey in obj) {
                    if (obj.hasOwnProperty(childKey)) {
                        const childValue = obj[childKey];
                        const childPath = `${path}.${childKey}`;

                        if (typeof childValue === 'object' && childValue !== null) {
                            // Recursive call for objects/arrays
                            traverse(childValue, id, position, level + 1, childKey, childPath);
                        } else {
                            // Handle primitive values as leaf nodes
                            const leafId = `${Date.now()}-${Math.random()}-${childKey}`;
                            const leafPosition = calculatePosition(id, position, level + 1);

                            nodes.push({
                                id: leafId,
                                data: { label: `${childKey}: ${childValue}` },
                                position: leafPosition,
                                style: getNodeClassName(obj[childKey])
                            });

                            searchCache.set(childPath, leafId);

                            edges.push({
                                id: `${id}-${leafId}`,
                                source: id,
                                target: leafId
                            });
                        }
                    }
                }
            } else if (Array.isArray(obj)) {
                // Handle arrays
                obj.forEach((item, index) => {
                    const itemPath = `${path}[${index}]`;
                    traverse(item, id, position, level + 1, `${key}[${index}]`, itemPath);
                });
            }
            else {
                // Primitive value at root
                const leafId = `${Date.now()}-${Math.random()}-value`;
                const leafPosition = calculatePosition(id, position, level + 1);

                nodes.push({
                    id: leafId,
                    data: { label: `${obj}` },
                    position: leafPosition,
                    style: {
                        background: '#f0f0f0',
                    }
                });
                searchCache.set(path, leafId);

                edges.push({
                    id: `${id}-${leafId}`,
                    source: id,
                    target: leafId,
                });
            }
        };

        traverse(jsonInput);
        setFlowObject({ nodes, edges });
    }
    return { flowObject, searchCache, generateFlowFromJSON } as const;

}

export default useGenerateJSON;