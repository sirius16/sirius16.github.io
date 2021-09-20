function $x(xpath, context=document) {
    context = [context, [...arguments].slice(2)].flat(9)
    return [...(function*() {var nodesSnapshot
        for (let node of context)
            for (let i = 0, len = (nodesSnapshot = document.evaluate(xpath, node, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null)).snapshotLength; i < len; i++)
                yield nodesSnapshot.snapshotItem(i);
    }
    )()].sort((i,j)=>(i.compareDocumentPosition(j) & Node.DOCUMENT_POSITION_PRECEDING) || -1)
}
