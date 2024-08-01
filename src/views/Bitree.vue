<template>
  <el-container>
    <el-aside>
      <h4>操作</h4>
      <el-popover placement="right" width="160" trigger="click">
        <center>
          <el-button
            type="primary"
            size="mini"
            @click="(dialogVisible1 = true), PreTraverse()"
            >先序遍历</el-button
          >
          <br /><br />
          <el-button
            type="primary"
            size="mini"
            @click="(dialogVisible2 = true), InTraverse()"
            >中序遍历</el-button
          >
          <br /><br />
          <el-button
            type="primary"
            size="mini"
            @click="(dialogVisible3 = true), PostTraverse()"
            >后序遍历</el-button
          >
        </center>

        <template #reference>
          <el-button class="main" type="primary" round @click="visible1 = true"
            >遍历二叉树</el-button
          >
        </template>
      </el-popover>

      <el-dialog
        title="先序遍历序列"
        :visible.sync="dialogVisible1"
        width="30%"
      >
        <span style="font-size: 17px">{{ PreOrderList }}</span>
        <br /><br /><br />
        <template #footer> </template>
      </el-dialog>
      <el-dialog
        title="中序遍历序列"
        :visible.sync="dialogVisible2"
        width="30%"
      >
        <span style="font-size: 17px">{{ InOrderList }}</span>
        <br /><br /><br />
        <template #footer> </template>
      </el-dialog>
      <el-dialog
        title="后序遍历序列"
        :visible.sync="dialogVisible3"
        width="30%"
      >
        <span style="font-size: 17px">{{ PostOrderList }}</span>
        <br /><br /><br />
        <template #footer> </template>
      </el-dialog>

      <el-dialog
        title="叶子结点个数"
        :visible.sync="dialogVisible4"
        width="30%"
      >
        <span style="font-size: 25px">{{ leaf }}</span>
        <br /><br /><br />
        <template #footer> </template>
      </el-dialog>

      <el-button
        class="main"
        type="primary"
        round
        @click="(dialogVisible4 = true), Count()"
        >叶子结点个数</el-button
      >

      <el-popover placement="right" width="160" trigger="click">
        <center>
          <el-button
            type="primary"
            size="mini"
            @click="(dialogVisible5 = true), PreThread()"
            >先序线索化</el-button
          >
          <br /><br />
          <el-button
            type="primary"
            size="mini"
            @click="(dialogVisible6 = true), InThread()"
            >中序线索化</el-button
          >
          <br /><br />
          <el-button
            type="primary"
            size="mini"
            @click="(dialogVisible7 = true), PostThread()"
            >后序线索化</el-button
          >
        </center>

        <template #reference>
          <el-button class="main" type="primary" round @click="visible2 = true"
            >二叉树线索化</el-button
          >
        </template>
      </el-popover>

      <el-dialog
        title="线索化先序遍历序列"
        :visible.sync="dialogVisible5"
        width="60%"
      >
        <el-table :data="PreOrderList_thread" stripe style="width: 100%">
          <el-table-column prop="value" label="value">
          </el-table-column>
          <el-table-column prop="leftTag" label="leftTag">
            <template slot-scope="scope">
              <span v-if="scope.row.leftTag == 0">LINK</span>
              <span v-if="scope.row.leftTag == 1">THREAD</span>
            </template>
          </el-table-column>
          <el-table-column prop="leftChild" label="leftChild">
          </el-table-column>
          <el-table-column prop="rightTag" label="rightTag">
            <template slot-scope="scope">
              <span v-if="scope.row.rightTag == 0">LINK</span>
              <span v-if="scope.row.rightTag == 1">THREAD</span>
            </template>
          </el-table-column>
          <el-table-column prop="rightChild" label="rightChild">
          </el-table-column>
        </el-table>
        <!-- <span style="font-size: 17px">{{ PreOrderList_thread }}</span> -->
        <template #footer> </template>
      </el-dialog>

      <el-dialog
        title="线索化中序遍历序列"
        :visible.sync="dialogVisible6"
        width="60%"
      >
        <el-table :data="InOrderList_thread" stripe style="width: 100%">
          <el-table-column prop="value" label="value">
          </el-table-column>
          <el-table-column prop="leftTag" label="leftTag">
            <template slot-scope="scope">
              <span v-if="scope.row.leftTag == 0">LINK</span>
              <span v-if="scope.row.leftTag == 1">THREAD</span>
            </template>
          </el-table-column>
          <el-table-column prop="leftChild" label="leftChild">
          </el-table-column>
          <el-table-column prop="rightTag" label="rightTag">
            <template slot-scope="scope">
              <span v-if="scope.row.rightTag == 0">LINK</span>
              <span v-if="scope.row.rightTag == 1">THREAD</span>
            </template>
          </el-table-column>
          <el-table-column prop="rightChild" label="rightChild">
          </el-table-column>
        </el-table>
        <!-- <span style="font-size: 17px">{{ InOrderList_thread }}</span> -->
        <template #footer> </template>
      </el-dialog>

      <el-dialog
        title="线索化后序遍历序列"
        :visible.sync="dialogVisible7"
        width="60%"
      >
        <el-table :data="PostOrderList_thread" stripe style="width: 100%">
          <el-table-column prop="value" label="value">
          </el-table-column>
          <el-table-column prop="leftTag" label="leftTag">
            <template slot-scope="scope">
              <span v-if="scope.row.leftTag == 0">LINK</span>
              <span v-if="scope.row.leftTag == 1">THREAD</span>
            </template>
          </el-table-column>
          <el-table-column prop="leftChild" label="leftChild">
          </el-table-column>
          <el-table-column prop="rightTag" label="rightTag">
            <template slot-scope="scope">
              <span v-if="scope.row.rightTag == 0">LINK</span>
              <span v-if="scope.row.rightTag == 1">THREAD</span>
            </template>
          </el-table-column>
          <el-table-column prop="rightChild" label="rightChild">
          </el-table-column>
        </el-table>
        <!-- <span style="font-size: 17px">{{ PostOrderList_thread }}</span> -->

        <template #footer> </template>
      </el-dialog>
    </el-aside>
    <el-main>
      <div>
        <div>
          <h1>二叉树演示</h1>
          <br /><br /><br /><br />
          请根据示例输入二叉树各结点的值(以[为开头,]为结尾,各结点之间用逗号连接,空结点用null表示)：
          <br /><br />
          (也可直接点击结点进行相应操作)
          <br /><br /><br /><br />
          <textarea
            style="width: 400px"
            id="raw_node_list"
            type="text"
          ></textarea>

          <!-- <el-input
            type="textarea"
            :autosize="{ minRows: 2 }"
            placeholder="请输入内容"
            style="width: 400px"
            id="raw_node_list"
          >
          </el-input> -->
          <br />
          <br />
          <el-button type="primary" id="raw_node_list_btn" @click="check()"
            >建立二叉树</el-button
          >
          <!-- <button id="raw_node_list_btn">submit</button> -->
        </div>

        <div
          style="
            position: absolute;
            left: 50%;
            transform: translate(-50%, 50px);
          "
        >
          <div id="canvas_container" style="position: absolute">
            <canvas id="canvas" width="200px" height="200px"></canvas>
            <div id="canvas_elem_container"></div>
            <div class="editbox" id="edit_box" style="display: none">
              <div
                style="text-align: right; cursor: pointer"
                id="close_editbox"
              >
                [x]
              </div>
              <br />
              <div>结点值: <span id="node_name_span">node</span></div>
              <br />
              <div id="nlnc">
                <label for="new_left_node">添加左孩子: </label>
                <input
                  id="new_left_node"
                  style="width: 100px"
                  type="number"
                />&nbsp;
                <!-- <button id="add_left_node_btn">OK</button> -->
                <el-button
                  type="primary"
                  id="add_left_node_btn"
                  size="mini"
                  icon="el-icon-check"
                  @click="addl()"
                  round
                  >确认</el-button
                >
              </div>
              <div id="nrnc">
                <br />
                <label for="new_right_node">添加右孩子: </label>
                <input id="new_right_node" style="width: 100px" type="number" />
                <!-- <button id="add_right_node_btn">OK</button> -->
                &nbsp;
                <el-button
                  type="primary"
                  id="add_right_node_btn"
                  size="mini"
                  icon="el-icon-check"
                  @click="addr()"
                  round
                  >确认</el-button
                >
              </div>
              <br />
              <el-button
                id="delete_node_btn"
                size="mini"
                type="danger"
                icon="el-icon-delete"
                @click="del()"
                round
                >删除结点</el-button
              >
              <!-- <button id="delete_node_btn">删除结点</button> -->
            </div>
          </div>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
// import passTree from "../assets/js/bitree.js"
// import TreeCode from "../js/tree.js";

export default {
  name: "Bitree",
  data() {
    return {
      info: "",
      LevelOrderList: [],
      visible1: false,
      visible2: false,
      dialogVisible1: false,
      dialogVisible2: false,
      dialogVisible3: false,
      dialogVisible4: false,
      dialogVisible5: false,
      dialogVisible6: false,
      dialogVisible7: false,
      tree: {},
      PreOrderList: [],
      InOrderList: [],
      PostOrderList: [],
      leaf: 0,
      PreOrderList_thread: [],
      InOrderList_thread: [],
      PostOrderList_thread: [],
    };
  },

  // watch:{
  //   $route(to,from){
  //     this.$route.go(0);
  //   }
  // },

  mounted() {
    require("../js/bitree.js");
    this.info = document.getElementById("raw_node_list").value;
  },

  methods: {
    addl() {
      this.$message({
        message: "添加左孩子成功！",
        type: "success",
      });
    },
    addr() {
      this.$message({
        message: "添加右孩子成功！",
        type: "success",
      });
    },
    del() {
      this.$message({
        message: "删除结点成功！",
        type: "success",
      });
    },

    check() {
      var val = document.getElementById("raw_node_list").value;
      if (
        !val ||
        val.length < 2 ||
        val[0] !== "[" ||
        val[val.length - 1] !== "]"
      )
        this.$message.error("输入格式不正确，请重试！");
      else
        this.$message({
          message: "创建二叉树成功！",
          type: "success",
        });
    },

    PreTraverse() {
      this.info = document.getElementById("raw_node_list").value;
      this.LevelOrderList = this.info.slice(1, this.info.length - 1).split(",");
      console.log(this.LevelOrderList);

      var ll = this.LevelOrderList;

      let bt = function (ele) {
        this.data = ele;
        this.lChild = null;
        this.rChild = null;
      };

      let createBiTree = function (biTree) {
        if (ll.length == 0) return;
        var str = ll.shift();
        if (str == "null") return;
        biTree.data = str;
        var parentList = [biTree];
        var currList = [];
        while (ll.length > 0) {
          while (parentList.length > 0) {
            var pNode = parentList.shift();

            if (ll.length === 0) {
              break;
            }
            var lnodeV = ll.shift();
            if (lnodeV != "null") {
              pNode.lChild = new bt(lnodeV);
              currList.push(pNode.lChild);
            }
            if (ll.length === 0) {
              break;
            }
            var rnodeV = ll.shift();
            if (rnodeV != "null") {
              pNode.rChild = new bt(rnodeV);
              currList.push(pNode.rChild);
            }
          }
          parentList = currList;
          currList = [];
        }
        return biTree;
      };

      let pl = [];

      let PreOrderTraverse = function (biTree) {
        if (biTree == null) return;
        console.log(biTree.data);
        pl.push(biTree.data);
        PreOrderTraverse(biTree.lChild);
        PreOrderTraverse(biTree.rChild);
      };
      var myTree = new bt("null");
      console.log(myTree);
      var Tree = createBiTree(myTree);
      console.log(Tree);

      PreOrderTraverse(Tree);
      this.PreOrderList = pl;
    },

    InTraverse() {
      this.info = document.getElementById("raw_node_list").value;
      this.LevelOrderList = this.info.slice(1, this.info.length - 1).split(",");
      console.log(this.LevelOrderList);

      var ll = this.LevelOrderList;

      let bt = function (ele) {
        this.data = ele;
        this.lChild = null;
        this.rChild = null;
      };

      let createBiTree = function (biTree) {
        if (ll.length == 0) return;
        var str = ll.shift();
        if (str == "null") return;
        biTree.data = str;
        var parentList = [biTree];
        var currList = [];
        while (ll.length > 0) {
          while (parentList.length > 0) {
            var pNode = parentList.shift();

            if (ll.length === 0) {
              break;
            }
            var lnodeV = ll.shift();
            if (lnodeV != "null") {
              pNode.lChild = new bt(lnodeV);
              currList.push(pNode.lChild);
            }
            if (ll.length === 0) {
              break;
            }
            var rnodeV = ll.shift();
            if (rnodeV != "null") {
              pNode.rChild = new bt(rnodeV);
              currList.push(pNode.rChild);
            }
          }
          parentList = currList;
          currList = [];
        }
        return biTree;
      };

      let pl = [];

      let InOrderTraverse = function (biTree) {
        if (biTree == null) return;
        InOrderTraverse(biTree.lChild);
        console.log(biTree.data);
        pl.push(biTree.data);
        InOrderTraverse(biTree.rChild);
      };
      var myTree = new bt("null");
      console.log(myTree);
      var Tree = createBiTree(myTree);
      console.log(Tree);

      InOrderTraverse(Tree);
      this.InOrderList = pl;
    },

    PostTraverse() {
      this.info = document.getElementById("raw_node_list").value;
      this.LevelOrderList = this.info.slice(1, this.info.length - 1).split(",");
      console.log(this.LevelOrderList);

      var ll = this.LevelOrderList;

      let bt = function (ele) {
        this.data = ele;
        this.lChild = null;
        this.rChild = null;
      };

      let createBiTree = function (biTree) {
        if (ll.length == 0) return;
        var str = ll.shift();
        if (str == "null") return;
        biTree.data = str;
        var parentList = [biTree];
        var currList = [];
        while (ll.length > 0) {
          while (parentList.length > 0) {
            var pNode = parentList.shift();

            if (ll.length === 0) {
              break;
            }
            var lnodeV = ll.shift();
            if (lnodeV != "null") {
              pNode.lChild = new bt(lnodeV);
              currList.push(pNode.lChild);
            }
            if (ll.length === 0) {
              break;
            }
            var rnodeV = ll.shift();
            if (rnodeV != "null") {
              pNode.rChild = new bt(rnodeV);
              currList.push(pNode.rChild);
            }
          }
          parentList = currList;
          currList = [];
        }
        return biTree;
      };

      let pl = [];

      let PostOrderTraverse = function (biTree) {
        if (biTree == null) return;
        PostOrderTraverse(biTree.lChild);
        PostOrderTraverse(biTree.rChild);
        console.log(biTree.data);
        pl.push(biTree.data);
      };
      var myTree = new bt("null");
      console.log(myTree);
      var Tree = createBiTree(myTree);
      console.log(Tree);

      PostOrderTraverse(Tree);
      this.PostOrderList = pl;
    },

    Count() {
      this.info = document.getElementById("raw_node_list").value;
      this.LevelOrderList = this.info.slice(1, this.info.length - 1).split(",");
      console.log(this.LevelOrderList);

      var ll = this.LevelOrderList;

      let bt = function (ele) {
        this.data = ele;
        this.lChild = null;
        this.rChild = null;
      };

      let createBiTree = function (biTree) {
        if (ll.length == 0) return;
        var str = ll.shift();
        if (str == "null") return;
        biTree.data = str;
        var parentList = [biTree];
        var currList = [];
        while (ll.length > 0) {
          while (parentList.length > 0) {
            var pNode = parentList.shift();

            if (ll.length === 0) {
              break;
            }
            var lnodeV = ll.shift();
            if (lnodeV != "null") {
              pNode.lChild = new bt(lnodeV);
              currList.push(pNode.lChild);
            }
            if (ll.length === 0) {
              break;
            }
            var rnodeV = ll.shift();
            if (rnodeV != "null") {
              pNode.rChild = new bt(rnodeV);
              currList.push(pNode.rChild);
            }
          }
          parentList = currList;
          currList = [];
        }
        return biTree;
      };

      let lf = 0;

      let PostOrderTraverse = function (biTree) {
        if (biTree == null) return;
        if (biTree.lChild == null && biTree.rChild == null) lf = lf + 1;
        PostOrderTraverse(biTree.lChild);
        PostOrderTraverse(biTree.rChild);
        console.log(biTree.data);
      };
      var myTree = new bt("null");
      console.log(myTree);
      var Tree = createBiTree(myTree);
      console.log(Tree);

      PostOrderTraverse(Tree);
      console.log(lf);
      this.leaf = lf;
    },

    InThread() {
      this.info = document.getElementById("raw_node_list").value;
      this.LevelOrderList = this.info.slice(1, this.info.length - 1).split(",");
      console.log(this.LevelOrderList);

      var ll = this.LevelOrderList;
      var LINK = 0;
      var THREAD = 1;

      let bt = function (ele) {
        this.data = ele;
        this.lChild = null;
        this.rChild = null;
        this.leftTag = this.rightTag = LINK;
      };

      let createBiTree = function (biTree) {
        if (ll.length == 0) return;
        var str = ll.shift();
        if (str == "null") return;
        biTree.data = str;
        var parentList = [biTree];
        var currList = [];
        while (ll.length > 0) {
          while (parentList.length > 0) {
            var pNode = parentList.shift();

            if (ll.length === 0) {
              break;
            }
            var lnodeV = ll.shift();
            if (lnodeV != "null") {
              pNode.lChild = new bt(lnodeV);
              currList.push(pNode.lChild);
            }
            if (ll.length === 0) {
              break;
            }
            var rnodeV = ll.shift();
            if (rnodeV != "null") {
              pNode.rChild = new bt(rnodeV);
              currList.push(pNode.rChild);
            }
          }
          parentList = currList;
          currList = [];
        }
        return biTree;
      };

      let pl = [];

      let node = function (a, b, c, d, e) {
        this.value = a;
        this.leftTag = b;
        this.leftChild = c;
        this.rightTag = d;
        this.rightChild = e;
      };

      let InOrderTraverse_thread = function (biTree) {
        var p = biTree;
        console.log(p);

        while (p) {
          while (p.leftTag === LINK) p = p.lChild;
          var Newnode = new node(
            p.data,
            p.leftTag,
            p.lChild.data,
            p.rightTag,
            p.rChild.data
          );
          // node.value=p.data;
          // node.leftTag=p.leftTag;
          // node.leftChild=p.lChild.data;
          // node.rightTag=p.rightTag;
          // node.rightChild=p.rChild.data;
          pl.push(Newnode);

          while (p.rightTag == THREAD) {
            p = p.rChild;
            if (p.data == "head") break;
            var Newnode = new node(
              p.data,
              p.leftTag,
              p.lChild.data,
              p.rightTag,
              p.rChild.data
            );
            pl.push(Newnode);
          }
          if (p.data == "head") break;
          p = p.rChild;
        }
      };

      // 二叉树中序线索化
      let inOrderThreading = function (tree) {
        var threadTree = new bt("head");
        threadTree.leftTag = LINK;
        threadTree.rightTag = THREAD;
        // 右指针回指
        threadTree.rChild = threadTree;

        var pre;
        // 若二叉树为空，左指针回指
        if (!tree) threadTree.lChild = threadTree;
        else {
          threadTree.lChild = tree;
          pre = threadTree;
          inThreading(tree); // 中序遍历进行中序线索化
          // 最后一个结点线索化
          pre.rChild = threadTree;
          pre.rightTag = THREAD;
          threadTree.rChild = pre;
        }

        return threadTree;

        function inThreading(p) {
          if (!p) return;

          inThreading(p.lChild); // 左子树线索化
          // 前驱线索
          if (!p.lChild) {
            p.leftTag = THREAD;
            p.lChild = pre;
          }
          // 后继线索
          if (!pre.rChild) {
            pre.rightTag = THREAD;
            pre.rChild = p;
          }
          pre = p;
          inThreading(p.rChild); // 右子树线索化
        }
      };

      var myTree = new bt("null");
      console.log(myTree);
      var Tree = createBiTree(myTree);
      console.log(Tree);

      var InthreadTree = inOrderThreading(Tree);
      console.log(InthreadTree);

      InOrderTraverse_thread(InthreadTree);
      console.log(pl);
      this.InOrderList_thread = pl;
    },

    PreThread() {
      this.info = document.getElementById("raw_node_list").value;
      this.LevelOrderList = this.info.slice(1, this.info.length - 1).split(",");
      console.log(this.LevelOrderList);

      var ll = this.LevelOrderList;
      var LINK = 0;
      var THREAD = 1;

      let bt = function (ele) {
        this.data = ele;
        this.lChild = null;
        this.rChild = null;
        this.leftTag = this.rightTag = LINK;
      };

      let createBiTree = function (biTree) {
        if (ll.length == 0) return;
        var str = ll.shift();
        if (str == "null") return;
        biTree.data = str;
        var parentList = [biTree];
        var currList = [];
        while (ll.length > 0) {
          while (parentList.length > 0) {
            var pNode = parentList.shift();

            if (ll.length === 0) {
              break;
            }
            var lnodeV = ll.shift();
            if (lnodeV != "null") {
              pNode.lChild = new bt(lnodeV);
              currList.push(pNode.lChild);
            }
            if (ll.length === 0) {
              break;
            }
            var rnodeV = ll.shift();
            if (rnodeV != "null") {
              pNode.rChild = new bt(rnodeV);
              currList.push(pNode.rChild);
            }
          }
          parentList = currList;
          currList = [];
        }
        return biTree;
      };

      let pl = [];

      let node = function (a, b, c, d, e) {
        this.value = a;
        this.leftTag = b;
        this.leftChild = c;
        this.rightTag = d;
        this.rightChild = e;
      };

      let PreOrderTraverse_thread = function (biTree) {
        var p = biTree;
        console.log(p);
        p = p.lChild;
        var Newnode = new node(
          p.data,
          p.leftTag,
          p.lChild.data,
          p.rightTag,
          p.rChild.data
        );
        pl.push(Newnode);
        while (p.rChild.data != "head") {
          if (p.leftTag == LINK) p = p.lChild;
          else p = p.rChild;
          var Newnode = new node(
            p.data,
            p.leftTag,
            p.lChild.data,
            p.rightTag,
            p.rChild.data
          );
          pl.push(Newnode);
        }
      };

      let PreOrderThreading = function (tree) {
        var threadTree = new bt("head");
        threadTree.leftTag = LINK;
        threadTree.rightTag = THREAD;
        // 右指针回指
        threadTree.rChild = threadTree;

        var pre;
        // 若二叉树为空，左指针回指
        if (!tree) threadTree.lChild = threadTree;
        else {
          threadTree.lChild = tree;
          pre = threadTree;

          PreThreading(tree); // 中序遍历进行中序线索化
          // 最后一个结点线索化
          pre.rChild = threadTree;
          pre.rightTag = THREAD;
          threadTree.rChild = pre;
        }

        return threadTree;

        function PreThreading(p) {
          if (!p) return;

          // 前驱线索
          if (!p.lChild) {
            p.leftTag = THREAD;
            p.lChild = pre;
          }
          // 后继线索
          if (!pre.rChild) {
            pre.rightTag = THREAD;
            pre.rChild = p;
          }
          pre = p;

          if (p.leftTag == LINK) PreThreading(p.lChild); // 左子树线索化

          if (p.rightTag == LINK) PreThreading(p.rChild); // 右子树线索化
        }
      };

      var myTree = new bt("null");
      console.log(myTree);
      var Tree = createBiTree(myTree);
      console.log(Tree);

      var PrethreadTree = PreOrderThreading(Tree);
      console.log(PrethreadTree);

      PreOrderTraverse_thread(PrethreadTree);
      console.log(pl);
      this.PreOrderList_thread = pl;
    },

    PostThread() {
      this.info = document.getElementById("raw_node_list").value;
      this.LevelOrderList = this.info.slice(1, this.info.length - 1).split(",");
      console.log(this.LevelOrderList);

      var ll = this.LevelOrderList;
      var LINK = 0;
      var THREAD = 1;

      let bt = function (ele) {
        this.data = ele;
        this.lChild = null;
        this.rChild = null;
        this.leftTag = this.rightTag = LINK;
      };

      let createBiTree = function (biTree) {
        if (ll.length == 0) return;
        var str = ll.shift();
        if (str == "null") return;
        biTree.data = str;
        var parentList = [biTree];
        var currList = [];
        while (ll.length > 0) {
          while (parentList.length > 0) {
            var pNode = parentList.shift();

            if (ll.length === 0) {
              break;
            }
            var lnodeV = ll.shift();
            if (lnodeV != "null") {
              pNode.lChild = new bt(lnodeV);
              currList.push(pNode.lChild);
            }
            if (ll.length === 0) {
              break;
            }
            var rnodeV = ll.shift();
            if (rnodeV != "null") {
              pNode.rChild = new bt(rnodeV);
              currList.push(pNode.rChild);
            }
          }
          parentList = currList;
          currList = [];
        }
        return biTree;
      };

      let pl = [];

      let node = function (a, b, c, d, e) {
        this.value = a;
        this.leftTag = b;
        this.leftChild = c;
        this.rightTag = d;
        this.rightChild = e;
      };

      let PostOrderTraverse_thread = function (biTree) {
        if (biTree.leftTag == 0) PostOrderTraverse_thread(biTree.lChild);
        if (biTree.rightTag == 0) PostOrderTraverse_thread(biTree.rChild);
        var Newnode = new node(
          biTree.data,
          biTree.leftTag,
          biTree.lChild.data,
          biTree.rightTag,
          biTree.rChild.data
        );
        pl.push(Newnode);

        // var p = biTree;
        // console.log(p);
        // p=p.lChild;
        //   var Newnode = new node(
        //     p.data,
        //     p.leftTag,
        //     p.lChild.data,
        //     p.rightTag,
        //     p.rChild.data
        //   );
        //   pl.push(Newnode);
        //   while(p.rChild.data!="head")
        //   {
        //     if(p.leftTag==LINK)
        //     p=p.lChild;
        //     else
        //     p=p.rChild;
        //     var Newnode = new node(
        //     p.data,
        //     p.leftTag,
        //     p.lChild.data,
        //     p.rightTag,
        //     p.rChild.data
        //   );
        //   pl.push(Newnode);
        //   }
      };

      let PostOrderThreading = function (tree) {
        var threadTree = new bt("head");
        threadTree.leftTag = LINK;
        threadTree.rightTag = THREAD;
        // 右指针回指
        threadTree.rChild = threadTree;

        var pre;
        // 若二叉树为空，左指针回指
        if (!tree) threadTree.lChild = threadTree;
        else {
          threadTree.lChild = tree;
          pre = threadTree;

          PostThreading(tree); // 中序遍历进行中序线索化
          // 最后一个结点线索化
          if (!pre.rChild) {
            pre.rChild = threadTree;
            pre.rightTag = THREAD;
          }
          threadTree.rChild = pre;
        }

        return threadTree;

        function PostThreading(p) {
          if (!p) return;

          PostThreading(p.lChild); // 左子树线索化
          PostThreading(p.rChild); // 右子树线索化

          // 前驱线索
          if (!p.lChild) {
            p.leftTag = THREAD;
            p.lChild = pre;
          }
          // 后继线索
          if (!pre.rChild) {
            pre.rightTag = THREAD;
            pre.rChild = p;
          }
          pre = p;
        }
      };

      var myTree = new bt("null");
      console.log(myTree);
      var Tree = createBiTree(myTree);
      console.log(Tree);

      var PostthreadTree = PostOrderThreading(Tree);
      console.log(PostthreadTree);

      PostOrderTraverse_thread(PostthreadTree.lChild);
      console.log(pl);
      this.PostOrderList_thread = pl;
    },
  },
};
</script>

<style>
.mask {
  border: 1px solid #000;
  position: absolute;
  font-size: 12px;
  cursor: pointer;
  z-index: 5;
}

.editbox {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  width: 300px;
  height: 200px;
  background: #f0f0f0;
  opacity: 0.8;
}

.main {
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10%;
  margin-bottom: 10%;
}
</style>