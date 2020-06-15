$(function() {
    load();
    $("#title").on("keydown", function(event) {
        if (event.keyCode === 13) {
            if ($(this).val() === "") {
                alert("请输入您要执行的事件！");
            } else {
                var local = getDate();
                // console.log(local);
                local.push({ title: $(this).val(), done: false });
                saveDate(local);
                load();
                $(this).val("");
            }
        }
    });
    $("ol,ul").on("click", "a", function() {
        // 先获取本地存储
        var data = getDate();
        // console.log(data);
        // 修改数据
        var index = $(this).attr("id");
        // console.log(index);
        // 保存到本地存储
        data.splice(index, 1);
        saveDate(data);
        // 重新渲染页面
        load();
    });
    $("ol,ul").on("click", "input", function() {
        // 先获取本地存储
        var data = getDate();
        // 修改数据
        var index = $(this).siblings("a").attr("id");
        console.log(index);
        data[index].done = $(this).prop("checked");
        console.log(data);
        // 保存到本地存储
        saveDate(data);
        // 重新渲染页面
        load();
    });
    // 设置获取本地存储函数
    function getDate() {
        var data = localStorage.getItem("todolist");
        if (data !== null) {
            return JSON.parse(data);
        } else {
            return [];
        }
    }
    // 设置保存本地存储函数
    function saveDate(data) {
        localStorage.setItem("todolist", JSON.stringify(data));
    }
    // 设置渲染加载数据页面函数
    function load() {
        var data = getDate();
        $("ol,ul").empty();
        var doingCount = 0;
        var doneCount = 0;
        $.each(data, function(i, n) {
            if (n.done) {
                $("ul").prepend("<li><input type='checkbox' checked ='checked'> <p>" + n.title + " </p> <a href='javascript:;' id=" + i + ">删除</a></li>");
                doneCount++;
            } else {
                $("ol").prepend("<li><input type='checkbox'> <p>" + n.title + " </p> <a href='javascript:;' id=" + i + ">删除</a></li>");
                doingCount++;
            }
        });
        $("#doing").text(doingCount);
        $("#done").text(doneCount);
    }
})