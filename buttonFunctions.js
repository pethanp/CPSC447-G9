var startNode, endNode;

function selectStart() {
    var selected = network.getSelectedNodes();

    // check if there is any selection
    if (selected == []) {
        error("Must select a start Node");
        return;
    }

    // check that selection isn't endNode
    if (selected[0] == endNode) {
        error("Can't select end as start node.");
        return;
    }

    // check if there is a current start node, if there isn't then reset startnode color
    if (startNode != null) {
        nodes.update([{ id: startNode, color: { background: '#97c2fc' } }]);
    }
    else {
        startNode = selected[0];
    }

    // change color to green
    nodes.update([{ id: 1, color: { background: "#7FFFD4" } }]);
}

function selectDestination() {
    var selected = network.getSelectedNodes(); 
    if (selected == startNode) {
        error("Can't select start as end node.");
        return;
    }
    nodes.update([{ id: 1, color: { background: "#ff9900" } }]);
}