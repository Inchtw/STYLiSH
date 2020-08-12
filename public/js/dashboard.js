/* eslint-disable no-undef */



// color form
function Dashboard(data){
this.data = data;
this.totalCount = function(){
    const count = document.getElementById('number');
    count.innerHTML = 'Total Revenue: ' + data.totalRevenue;
}


this.Bycolor = function(){
    let color_data = [{
        values: data.ByColor.map(x => x.count), // 自己塞
        labels: data.ByColor.map(x => x.colorName), // 自己塞
        marker: {
            colors: data.ByColor.map(x => x.colorCode) // 自己塞
        },
        type: 'pie'
      }];
      
      var layout = {
        title: {
            text:'Product sold percentage in different colors',
        },
        height: 350,
      };
      
      Plotly.newPlot('pie', color_data, layout);
    }

this.Byprice = function(){
let trace = {
    x: this.data.Byprice,
    type: 'histogram',

}
let layout = {
    title: {
        text:'Product sold quantity in different price range',
    },
    xaxis: {
        title: {
            text: 'Price Range',
        },
    },
    yaxis: {
        title: {
            text: 'Quantity',
        }
    }
};
let data = [trace];
Plotly.newPlot('histogram', data, layout);

}

this.byTop5size = function(){
    let sizeData= this.data.byTop5size.map(d => ({
        x: d.ids.map(id => 'product ' + id),
        y: d.count,
        name: d.size,
        type: 'bar'
    }));

    let layout = {
        barmode: 'stack',
        title: {
            text:'Quantity of top 5 sold products in different sizes',
        },
        yaxis: {
            title: {
                text: 'Quantity',
            }
        }
    };
    Plotly.newPlot('bar', sizeData, layout);
}

}

