var startNode, endNode;

/* Function to set start Node and visually respresent it */
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
        startNode = selected[0];
    }
    else {
        startNode = selected[0];
    }

    // change color to green
    nodes.update([{ id: startNode, color: { background: "#7FFFD4" } }]);

    // FIXME: add more functionality for packet sending later
}

/* Function to set end Node and visually respresent it */
function selectDestination() {
    let selected = network.getSelectedNodes();

    // check if there is any selection
    if (selected == []) {
        error("Must select an end Node");
        return;
    }

    // check that selection isn't startNode
    if (selected[0] == startNode) {
        error("Can't select start as end node.");
        return;
    }

    // check if there is a current end node, if there is then reset end node color and replace value
    if (endNode != null) {
        nodes.update([{ id: endNode, color: { background: '#97c2fc' } }]);
        endNode = selected[0];
    }
    else {
        endNode = selected[0];
    }

    // change color to orange
    nodes.update([{ id: endNode, color: { background: "#ff9900" } }]);

    // FIXME: add more functionality for packet sending later
}