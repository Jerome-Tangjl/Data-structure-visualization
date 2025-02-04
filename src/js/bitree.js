const treeGraphConfig = {
    r: 20,
    iw: 12,
    ih: 70,
    canvasW: 1200,
    canvasH: 600,
    $container: document.getElementById("canvas_elem_container")
}
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const $editBox = document.getElementById("edit_box")
const $rawNodeList = document.getElementById("raw_node_list")
const marknodeAttr = "node"
const selectedColor = "#d0f0ab"

var currTree
var selectedNodeID
// var PreOrderList=[]
var leaf=4




document.getElementById("raw_node_list_btn").onclick = function () {
    var val = $rawNodeList.value
    if (!val || val.length < 2 || val[0] !== "[" || val[val.length - 1] !== "]") {
        // alert("输入格式不正确，请重试！")
        return
    }
    var nodeList = val.slice(1, val.length - 1).split(",")
    for (var i = 0; i < nodeList.length; i++) {
        if (nodeList[i].trim() === "null") {
            nodeList[i] = null
        }
    }
    currTree = NewTree(nodeList)
    DrawTree(ctx, treeGraphConfig, currTree)
    // passTree(leaf)
}
document.getElementById("close_editbox").onclick = function () {
    $editBox.style.display = "none"
    selectedNodeID = null
}
document.getElementById("add_left_node_btn").onclick = function () {
    var node = currTree.nodeMap[selectedNodeID]
    var val = document.getElementById("new_left_node").value
    if (!node || !val) {
        return
    }
    newNode = NewNode(node, val)
    node.left = newNode
    currTree.addNode(newNode)
    DrawTree(ctx, treeGraphConfig, currTree)
    document.getElementById("nlnc").style.display = "none"
    document.getElementById("new_left_node").value = ""
    updateInputVal(currTree.toRawNodeList())
}
document.getElementById("add_right_node_btn").onclick = function () {
    var node = currTree.nodeMap[selectedNodeID]
    var val = document.getElementById("new_right_node").value
    if (!node || !val) {
        return
    }
    newNode = NewNode(node, val)
    node.right = newNode
    currTree.addNode(newNode)
    DrawTree(ctx, treeGraphConfig, currTree)
    document.getElementById("nrnc").style.display = "none"
    document.getElementById("new_right_node").value = ""
    updateInputVal(currTree.toRawNodeList())
    // currTree.PreOrderTraverse()
    // console.log(PreOrderList)
}
document.getElementById("delete_node_btn").onclick = function () {
    var node = currTree.nodeMap[selectedNodeID]
    currTree.removeNode(node)
    DrawTree(ctx, treeGraphConfig, currTree)
    $editBox.style.display = "none"
    updateInputVal(currTree.toRawNodeList())
    selectedNodeID = null
}

function updateInputVal(val) {
    var res = "["
    for (var i = 0; i < val.length; i++) {
        if (val[i]) {
            res += val[i]
        } else {
            res += "null"
        }
        if (i < val.length - 1) {
            res += ","
        }
    }
    res += "]"
    $rawNodeList.value = res
}

function NewNode(parent, val) {
    return new function () {
        this.parent = parent
        this.left = null
        this.right = null
        this.val = val
        this.id = "n-" + Math.floor(Math.random() * 10000000)
    }()
}

function NewPosition(x, y) {
    return new function () {
        this.x = x
        this.y = y
    }()
}

function Tree() {
    this.root = null
    this.nodeMap = {}
}

Tree.prototype.PreOrderTraverse = function () {
    var stack = new Array();


    PreOrderList.push(this.root.val)




    if (this.root === null) {
        return
    }
    PreOrderList.push(this.root.val)
    this.left.PreOrderTraverse()
    this.right.PreOrderTraverse()

}

Tree.prototype.toRawNodeList = function () {
    if (this.root === null) {
        return []
    }
    rawNodeList = [this.root.val]
    parentList = [this.root]
    // leaf=0
    while (parentList.length > 0) {
        var curr = parentList.shift()
        if (!curr.left && !curr.right) {
            // continue
            // leaf=leaf+1

        }
        if (curr.left) {
            rawNodeList.push(curr.left.val)
            parentList.push(curr.left)
        } else {
            rawNodeList.push(null)
        }
        if (curr.right) {
            rawNodeList.push(curr.right.val)
            parentList.push(curr.right)
        } else {
            rawNodeList.push(null)
        }
    }
    while (rawNodeList.length > 0) {
        var tmp = rawNodeList.pop()
        if (tmp) {
            rawNodeList.push(tmp)
            break
        }
    }
    return rawNodeList
}

Tree.prototype.addNode = function (newNode) {
    this.nodeMap[newNode.id] = newNode
}

Tree.prototype.removeNode = function (node) {
    if (!node) {
        return
    }
    this.removeNode(node.left)
    this.removeNode(node.right)
    if (node.parent) {
        if (node.parent.left === node) {
            node.parent.left = null
        } else {
            node.parent.right = null
        }
    }
    delete this.nodeMap[node.id]
    if (this.root === node) {
        this.root = null
    }
}

Tree.prototype.getHeight = function () {
    function gh(node) {
        if (!node) {
            return 0
        }
        return Math.max(gh(node.left), gh(node.right)) + 1
    }

    return gh(this.root)
}

function NewTree(nodeList) {
    var newT = new Tree()
    if (!nodeList || nodeList.length === 0 || !nodeList[0]) {
        return newT
    }
    var root = NewNode(null, nodeList.shift())
    newT.root = root
    newT.nodeMap[root.id] = root
    var parentList = [root]
    var currList = []
    while (nodeList.length > 0) {
        while (parentList.length > 0) {
            var pNode = parentList.shift()

            if (nodeList.length === 0) {
                break
            }
            var lnodeV = nodeList.shift()
            if (lnodeV) {
                lnode = NewNode(pNode, lnodeV)
                newT.nodeMap[lnode.id] = lnode
                pNode.left = lnode
                currList.push(lnode)
            }
            if (nodeList.length === 0) {
                break
            }
            var rnodeV = nodeList.shift()
            if (rnodeV) {
                rnode = NewNode(pNode, rnodeV)
                newT.nodeMap[rnode.id] = rnode
                pNode.right = rnode
                currList.push(rnode)
            }
        }
        parentList = currList
        currList = []
    }
    console.log(newT)
    return newT
}

function DrawTree(ctx, config, tree) {
    ctx.clearRect(0, 0, config.canvasW, config.canvasH)
    config.$container.innerHTML = ""

    if (!tree || !tree.root) {
        return
    }

    function drawLine(startPos, endPos) {
        ctx.beginPath()
        ctx.moveTo(startPos.x, startPos.y)
        ctx.lineTo(endPos.x, endPos.y)
        ctx.stroke()
    }

    function drawCircle(pos) {
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, treeGraphConfig.r, 0, 2 * Math.PI);
        ctx.stroke()
    }

    function addElem(currNode, currPos) {
        const $elem = document.createElement("div");
        $elem.setAttribute("class", "mask")
        $elem.setAttribute("id", currNode.id)
        $elem.style.top = currPos.y - config.r + "px"
        $elem.style.left = currPos.x - config.r + "px"
        $elem.style.width = config.r * 2 + "px"
        $elem.style.height = config.r * 2 + "px"
        $elem.style.borderRadius = config.r + "px"
        $elem.style.lineHeight = config.r * 2 + "px"
        $elem.style.textAlign = "center"
        $elem.style.backgroundColor = "#fff"
        $elem.textContent = currNode.val + ""
        config.$container.appendChild($elem)
        $elem.onclick = function () {
            $editBox.style.display = "block"
            document.getElementById("node_name_span").innerText = currNode.val
            selectedNodeID = currNode.id
            if (!currNode.left) {
                document.getElementById("nlnc").style.display = "block"
            } else {
                document.getElementById("nlnc").style.display = "none"
            }
            if (!currNode.right) {
                document.getElementById("nrnc").style.display = "block"
            } else {
                document.getElementById("nrnc").style.display = "none"
            }
        }
    }

    function drawNode(parentNode, parentPos, currNode, currPos, height) {
        if (!currNode) {
            return
        }
        // draw line to parent
        if (parentNode) {
            if (parentNode.left === currNode) {
                drawLine(NewPosition(parentPos.x, parentPos.y), NewPosition(currPos.x, currPos.y))
            } else {
                drawLine(NewPosition(parentPos.x, parentPos.y), NewPosition(currPos.x, currPos.y))
            }
        }
        // drawCircle(currPos)
        addElem(currNode, currPos)
        drawNode(currNode, currPos, currNode.left, NewPosition(currPos.x - config.iw * 2 ** (height - 1), currPos.y + config.ih), height - 1)
        drawNode(currNode, currPos, currNode.right, NewPosition(currPos.x + config.iw * 2 ** (height - 1), currPos.y + config.ih), height - 1)
    }

    var height = tree.getHeight()
    document.getElementById("canvas").setAttribute("width", 2 ** height * config.iw * 2 + "px")
    document.getElementById("canvas").setAttribute("height", config.ih * (height + 1) + "px")
    drawNode(null, null, tree.root, NewPosition(2 ** height * config.iw, config.ih), height)
}
// TODO: just for test
updateInputVal([2, 5, 1, null, 4, null, 6])

        // function passTree(peaf) {
        //     console.log(leaf)
        //     return leaf

        // }

        // export {passTree };