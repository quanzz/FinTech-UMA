// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('chan'));

// 日期
var dates = [
    "2016-03-27", "2016-03-28", "2016-03-29", "2016-03-30", "2016-03-31", 
    "2016-04-01", "2016-04-04", "2016-04-05", "2016-04-06", "2016-04-07", 
    "2016-04-08", "2016-04-11", "2016-04-12"
    ];
// k线数据：开，收，低，高
var data_k = [
    [1,4,1,6],
    [5,6,5,9],
    [9,11,5,13],
    [12,15,8,17],
    [19,20,18,21],
    [20,15,13,22],
    [17,13,13,18],
    [15,10,9,16],
    [12,13,8,15],
    [14,19,10,20],
    [20,22,17,24],
    [23,24,20,25],
    [28,32,22,35]
];
// 线段数据
var data_line = [
    [0,2.5],
    [4,20],
    [8,8],
    [12,35]
];
// 中枢
var data_pivots = [
    [[2,8], [9,8], [9,20], [2,20], [2,8]],
    [[2,8], [12,8], [12,20], [2,20], [2,8]]
];
// 卖点，x轴下标
var data_sells = [4,12];
// 买点，x轴下标
var data_buys = [1,8];
// macd数据，对应x轴
var data_macd = [2,3,4,5,6,4,5,6,5,-1,-2,-4,-3];

// 指定图表的配置项和数据
var option = {
    
    // 图片标题:
    title: {
        left: 'center',  // 居中显示
        text: 'MACD背离买卖点提示'    // 标题内容
    },

    // 图例组件:
    // 图中可能显示多种类型的数据
    legend: {
        top: 30,
        // 这里面的项是通过series里面的name进行关联的
        // 如果没有对应的name，就不会显示了
        data: ['日K', '线段', '中枢', '买点', '卖点']
    },

    // 不同坐标系的样式设置
    grid: [{
        left: 20,
        right: 20,
        top: 110,
        height: 200
    }, {
        left: 20,
        right: 20,
        height: 80,
        top: 360
    }],

    // 坐标轴指示器：
    // 一张图中可能有多个子图，这里设置子图的x坐标轴
    axisPointer: {
        // 设置坐标轴的联动：
        // link的值是一个数组, 数组中没一个值{..}是一个group
        // 每个group是联动的坐标轴
        link: [{
            xAxisIndex: [0, 1]
        }]
    },

    // 数据缩放组件：有缩放条和缩放按钮的那个
    // dataZoom是数组，里面每一项都是一个缩放控件
    dataZoom: [{
        type: 'slider',      // 有一个滚动条
        xAxisIndex: [0, 1],  // 控制两个x轴
        realtime: true,      // 不是实时
        start: 0,           // 离起始位置的百分比
        end: 100,             // 离起始位置的百分比
        top: 65,             // 离整个dom上侧的距离，单位px
        height: 20,          // 缩放条的高度
        handleIcon: 'M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                             // 缩放按钮的图形样式
        handleSize: '100%'   // 缩放按钮的大小百分比
    }, {
        type: 'inside',      // 在数据区域内通过滚轮控制
        xAxisIndex: [0, 1],  // 控制两个x轴
        start: 40,           // 离起始位置的百分比 
        end: 70              // 离起始位置的百分比        
    }],

    // x轴样式和数据设置：
    // 是一个数组，每一项是每一个x轴的数据，通过gridIndex指示是哪个坐标轴
    // gridIndex默认是0
    xAxis: [{
        type: 'category',    // 类目轴，用于离散数值
        data: dates,         // 坐标轴具体数值
        boundaryGap : false, // 数据在刻度之间显示true，数据在刻度上显示false
        axisLine: { lineStyle: { color: '#777' } },
                             // 坐标轴样式设置
        // 坐标轴标签设置
        axisLabel: {
            formatter: function (value) {
                return echarts.format.formatTime('MM-dd', value);
            }
        },
        min: 'dataMin',      // 取最小值作为最小刻度
        max: 'dataMax',      // 取最大值作为最大刻度
        // 坐标轴指示器设置
        axisPointer: {
            show: true       // 是否显示该坐标轴指示器
        }
    }, {
        type: 'category',    // 类目轴，用于离散数值
        gridIndex: 1,        // 指示是1号x轴
        data: dates,         // 配置数据
        scale: true,         // 设置为true以后不会强行包含0刻度
        boundaryGap : false, // 数据在刻度之间显示true，数据在刻度上显示false
        splitLine: {show: false}, // 分割线样式
        axisLabel: {show: false}, // 刻度标签样式
        axisTick: {show: false},  // 刻度样式
        axisLine: { lineStyle: { color: '#777' } }, //坐标轴线的样式
        splitNumber: 20,     // 分割段数，根据实际情况调整
        min: 'dataMin',      // 取最小值作为最小刻度
        max: 'dataMax',      // 取最大值作为最大刻度
        axisPointer: {
            type: 'shadow',  // 阴影样式，非刻度样式
            label: {show: false}, // 显示指示器标签
            triggerTooltip: true, // 是否触发tooltp
            // 设置拖拽手柄，适用于触屏的情形
            handle: {
                show: true,
                margin: 30,
                color: '#B80C00'
            }
        }
    }],

    // y轴样式设置（注意，
    // 这里还没有填充y轴的数据, y轴数据通过series来填充）：
    yAxis: [{
        scale: true,        // 是否脱离包含0刻度
        splitNumber: 2,     // 分割段数，根据实际情况调整
        axisLine: { lineStyle: { color: '#777' } }, // 坐标轴线样式
        splitLine: { show: true },  // 是否显示分割线
        axisTick: { show: false },  // 是否显示刻度
        // 标签设置
        axisLabel: {
            inside: true,    // 内部显示
            formatter: '{value}\n'
        }
    }, {
        scale: true,
        gridIndex: 1,
        splitNumber: 2,
        axisLabel: {show: false},
        axisLine: {show: false},
        axisTick: {show: false},
        splitLine: {show: false}
    }],

    // 设置数据系列，就是具体在图中显示的数据
    // 是数组，每一项的数据通过xAxisIndex和yAxisIndex来指示在哪个坐标轴显示
    // 不指示的话默认在0号坐标轴显示
    // series一定要在这里声明，否则会报错，不像python那样
    series: []
};


function loadData() {
    // concat 之后必须要赋值给原来的变量，因为concat是返回新的对象
    // 添加k线数据
    option.series = option.series.concat({
        type: 'candlestick',
        name: '日K',
        data: data_k,
        z: 0,    // z通道，越大越靠前
        itemStyle: {
            // 普通的显示效果
            normal: {
                color: '#ef232a',
                color0: '#14b143',
                borderColor: '#ef232a',
                borderColor0: '#14b143'
            },
            // 强调的显示效果，鼠标悬停或者选中图例
            emphasis: {
                color: 'black',
                color0: '#444',
                borderColor: 'black',
                borderColor0: '#444'
            }
        }
    });

    // 添加线段数据
    option.series = option.series.concat({
        type: 'line',
        name: '线段',
        showSymbol: false, // 是否显示连接点
        z: 1,              // z通道，越大越靠前
        data: data_line,   // 点坐标
        // 折线的样式
        lineStyle: {
            color: '#010077'
        }
    });

    // 添加中枢数据
    for(var i = 0; i < data_pivots.length; i++) {
        option.series = option.series.concat({
            type: 'line',
            name: '中枢',
            showSymbol: false, // 是否显示连接点
            z: 1,              // z通道，越大越靠前
            data: data_pivots[i],  // 点坐标
            // 折线的样式
            lineStyle: {
                color: '#010031'
            }
        });
    }

    // 添加卖点数据
    var sell_points = [];
    for(i = 0; i < data_sells.length; i++) {
        sell_points = sell_points.concat([[data_sells[i],data_k[data_sells[i]][1]]]);
    }
    option.series = option.series.concat({
        type: 'scatter',
        name: '卖点',
        z: 2,                  // z通道，越大越靠前
        symbol: 'triangle',    // 散点的形状
        symbolSize: 20,        // 散点的大小
        symbolRotate: 180,     // 散点的旋转角度
        // 散点的样式
        itemStyle: {
            color: '#3cf212'
        },
        data: sell_points
    });

    // 添加买点数据
    var buy_points = [];
    for(i = 0; i < data_buys.length; i++) {
        buy_points = buy_points.concat([[data_buys[i],data_k[data_buys[i]][1]]]);
    }
    option.series = option.series.concat({
        type: 'scatter',
        name: '买点',
        z: 2,                  // z通道，越大越靠前
        symbol: 'triangle',    // 散点的形状
        symbolSize: 20,        // 散点的大小
        symbolRotate: 0,      // 散点的旋转角度
        // 散点的样式
        itemStyle: {
            color: '#ffcb0c'
        },
        data: buy_points
    });

    // 添加macd数据
    var macd_positives = [];
    var macd_negtives = [];
    for(i = 0; i < data_macd.length; i++) {
        if(data_macd[i]>=0) {
            macd_positives = macd_positives.concat([[i,data_macd[i]]]);
        } else {
            macd_negtives = macd_negtives.concat([[i,data_macd[i]]]);
        }
    }
    option.series = option.series.concat({
        type: 'bar',
        name: 'macd',
        xAxisIndex: 1,
        yAxisIndex: 1,
        barWidth: 2,    // 柱条的颜色
        // 柱条的样式
        itemStyle: {
            color: "#9c2828"
        },
        data: macd_positives
    });
    option.series = option.series.concat({
        type: 'bar',
        name: 'macd',
        xAxisIndex: 1,
        yAxisIndex: 1,
        barWidth: 2,    // 柱条的颜色
        // 柱条的样式
        itemStyle: {
            color: "#0e9c1a"
        },
        data: macd_negtives
    });

}

// 装载数据
loadData();
// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);