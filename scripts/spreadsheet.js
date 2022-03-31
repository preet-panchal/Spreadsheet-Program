// const floatCheck= /^\s*(\+|-)?((\d+(\.\d+)?)|(\.\d+))\s*$/;

// data for table-1
const colHeaders1 = ['Student ID', 'Asmt 1', 'Asmt 2', 'Asmt 3'];
const gradesData1 = [
    {'id': '100000000', 'asmt-1': 4.5, 'asmt-2': 3.75, 'asmt-3': 3.4},
    {'id': '100000001', 'asmt-1': 4.25, 'asmt-2': 4.12, 'asmt-3': 4.25},
    {'id': '100000002', 'asmt-1': 5.0, 'asmt-2': 4.75, 'asmt-3': 4.5},
];

// const colHeaders2 = ['Student ID', 'Asmt 1', 'Asmt 2', 'Asmt 3', 'Midterm', 'Final Exam'];
// const gradesData2 = [
//     {'id': '100000001', 'asmt-1': 92.0, 'asmt-2': 80.0, 'asmt-3': 100.0, 'midterm': 62.5, 'final': 81.5},
//     {'id': '100000002', 'asmt-1': 100.0, 'asmt-2': 85.5, 'asmt-3': 90.0, 'midterm': 75.0, 'final': 90.25},
//     {'id': '100000003', 'asmt-1': 80.0, 'asmt-2': 90.5, 'asmt-3': 90.0, 'midterm': 66.5, 'final': 68.0},
//     {'id': '100000004', 'asmt-1': 100.0, 'asmt-2': 100.0, 'asmt-3': 100.0, 'midterm': 98.0, 'final': 95.5},
//     {'id': '100000005', 'asmt-1': 100.0, 'asmt-2': 90.0, 'asmt-3': 100.0, 'midterm': 58.5, 'final': 72.0},
//     {'id': '100000006', 'asmt-1': 90.5, 'asmt-2': 81.5, 'asmt-3': 95.5, 'midterm': 65.5, 'final': 64.0},
//     {'id': '100000007', 'asmt-1': 40.5, 'asmt-2': 50.5, 'asmt-3': 65.5, 'midterm': 22.5, 'final': 51.0},
//     {'id': '100000008', 'asmt-1': 70.0, 'asmt-2': 75.0, 'asmt-3': 70.0, 'midterm': 55.5, 'final': 21.0},
//     {'id': '100000009', 'asmt-1': 80.0, 'asmt-2': 82.5, 'asmt-3': 65.0, 'midterm': 72.5, 'final': 88.0},
// ];

var selected = null;
var clicked = null;
var preVal = 0;

$(document).ready(function() {
    // creating table-1
    $('#table-1').append('<thead> <tr> </tr> </thead>');
    $thead = $('#table-1 > thead > tr:first');
    colHeaders1.forEach(function(colHeader) {
        $thead.append('<th>' + colHeader + '</th>');
    });

    $('#table-1').append('<tbody> <tr> </tr> </tbody>');
    $tbody = $('#table-1 > tbody');
    gradesData1.forEach(function(data) {
        $tbody.append('<tr><th scope="row">' + data.id + '</th><td>' + data["asmt-1"] + '</td><td>' + data["asmt-2"] + '</td><td>' + data["asmt-3"] + '</td></tr>');
    });

    // using fetch to generate table-2
    fetch('./grades.csv')
    .then((response) => response.text())
    .then(function(content) {
        let lines = content.split('\n');
        for (var i = 0; i < lines.length; i++){
            var words = lines[i].split(',');
            var newRow = document.createElement('tr');
                for (var j = 0; j < words.length; j++){
                    if (i == 0) {
                        var newCell = document.createElement('th');
                        // if(j != 0){                           
                        //     newCell.classList.add('col-header');
                        // } 
                        newCell.innerText = words[j];
                    } else {
                        if (j == 0) {
                            var newCell = document.createElement('th');
                            // newCell.classList.add('row-header');
                            newCell.setAttribute('scope', 'row')
                        } else {
                            var newCell = document.createElement('td');
                        }
                        newCell.innerText = words[j];
                    }
                    newRow.appendChild(newCell);
                
                $('#table-2').append(newRow);
            }
        }
    }).then(function() {
        // calling select / deselect class 
        $('th').click(function() {
            if (selected) {
                selected.removeClass('select');
                selected.deselectAll();
                if (selected.is($(this))) {
                    selected = null;
                    return;
                }
            }
            // $(this).addClass('select');
            selected = $(this);
            if (selected.attr('scope') == 'row') {
                selected.selectRow();
                return;
            }
            selected.selectCol();
        });
    
        //add click event handler to all td elements
        // $("td").click(function(){
        //     editCell(this)
        // });
        var value;
        var previous = $(this);
        $('td').click(function() {
            value = $(this).text();
            if ($(this).has('input').length) {
                return;
            }

            if (!$(this).is(previous)) {
                $('td').removeClass('select');
            }
            
            // implementing editing for cells
            $(this).addClass('select');
            $(this).html('<input type=\"text\"></input>');
            $('input').val(value);
            $('input').focus();

            $('input').keypress(function (e) {
                if (e.which == '13') {
                    $(this).parent().text($(this).val());
                    $('td').removeClass('select');
                    $(this).remove();
                }
            });

            $('input').focusout(function () {
                $(this).parent().text(value);
                $('td').removeClass('select');
                $(this).remove();
            });
            previous = $(this);
        });
    });

    // $('#table-2').append('<thead> <tr> </tr> </thead>');
    // $thead = $('#table-2 > thead > tr:first');
    // colHeaders2.forEach(function(colHeader) {
    //     $thead.append('<th>' + colHeader + '</th>');
    // });

    // $('#table-2').append('<tbody> <tr> </tr> </tbody>');
    // $tbody = $('#table-2 > tbody');
    // gradesData2.forEach(function(data) {
    //     $tbody.append('<tr><th scope="row">' + data.id + '</th><td>' + data["asmt-1"] + '</td><td>' + data["asmt-2"] + '</td><td>' + data["asmt-3"] + '</td><td>' + data["midterm"] + '</td><td>' + data["final"] + '</td></tr>');
    // });

    // $('th').click(function() {
    //     if (selected) {
    //         selected.removeClass('select');
    //         selected.deselectAll();
    //         if (selected.is($(this))) {
    //             selected = null;
    //             return;
    //         }
    //     }
    //     // $(this).addClass('select');
    //     selected = $(this);
    //     if (selected.attr('scope') == 'row') {
    //         selected.selectRow();
    //         return;
    //     }
    //     selected.selectCol();
    // });

    // $('td').click(function() {
    //     preVal = $(this).text();
    //     $(this).attr('contenteditable', true);
    // });

    // $('td').focusout(function() {
    //     $(this).text(preVal);
    //     $(this).attr('contenteditable', false);
    // })

    // $('td').on("keydown", function(e) {
    //     if (e.keyCode == 13) {
    //         if (!floatCheck.test($(this).text()) || $(this).text() < 0 || $(this).text() > 100) {
    //             $(this).text(preVal);
    //         }
    //         e.preventDefault();
    //         preVal = $(this).text();
    //         $(this).attr('contenteditable', false);
    //     }
    // });
//     var value;
//     var previous = $(this);
//     $('td').click(function() {
//         value = $(this).text();
//         if ($(this).has('input').length) {
//             return;
//         }

//         if (!$(this).is(previous)) {
//             $('td').removeClass('select');
//         }

//         $(this).addClass('select');
//         $(this).html('<input type=\"text\"></input>');
//         $('input').val(value);
//         $('input').focus();

//         $('input').keypress(function (e) {
//             if (e.which == '13') {
//                 $(this).parent().text($(this).val());
//                 $('td').removeClass('select');
//                 $(this).remove();
//             }
//         });

//         $('input').focusout(function () {
//             $(this).parent().text(value);
//             $('td').removeClass('select');
//             $(this).remove();
//         });
//         previous = $(this);
//     });
});

// highlights column
$.fn.selectCol = function() {
    var gradesCol = [];
    var index = this.index();
    if (index == 0) {
        this.closest('table').find('td').each((a,b) => {
            $(b).addClass('select');
            gradesCol.push($(b).text());
        })
    } else {
        this.closest('table').find('tr').each((a,b) => {
            $(b).find('td').eq(index-1).addClass('select');
            gradesCol.push($(b).find('td').eq(index-1).text()); 
        });
        gradesCol.splice(0,2);
    }
    plot(gradesCol);
}

// highlights row
$.fn.selectRow = function() {
    var gradesRow = [];
    this.closest('tr').find('td').each((a,b) => {
        console.log(a + ', ' + b);
        $(b).addClass('select');
        gradesRow.push($(b).text());
    });
    plot(gradesRow);
}

$.fn.deselectAll = function() {
    this.closest('table').find('td').each((a,b) => {
        $(b).removeClass('select');
    })
}

const sumCounts = obj => Object.values(obj).reduce((a, b) => a + b);


// D3.js starts here ----------------------------------------------------------------------------------
function plot(numberGrades) {
    var letterGrades = numberGrades.map(getGrade);
    var gradeCounts = {}
    letterGrades.forEach(e => gradeCounts[e] ? gradeCounts[e]++ : gradeCounts[e] = 1);
    var plotData = []
    var totalCount = sumCounts(gradeCounts);
    for (var k in gradeCounts) {
        plotData.push({letter: k, freq: (gradeCounts[k] / totalCount)});
    }

    d3.select('svg').remove();

    const margin = 50;
    const width = 800;
    const height = 500;
    const chartWidth = width - 2 * margin;
    const chartHeight = height - 2 * margin;

    const colourScale = d3.scaleLinear()
                        .domain([0, 1])
                        .range(['white', 'blue']);
    
    const xScale = d3.scaleBand()
                    .range([0, chartWidth])
                    .domain(['A', 'B', 'C', 'D', 'F'])
                    .padding(0.3);
    
    const yScale = d3.scaleLinear()
                    .range([chartHeight, 0])
                    .domain([0, 1]);
    
    const svg = d3.select('#svg-div')
                .append('svg')
                .attr('width', width)
                .attr('height', height);
    
    const canvas = svg.append('g')
                    .attr('transform', `translate(${margin}, ${margin})`);
    
    // chart title
    svg.append('text')
        .attr('x', margin + chartWidth / 2 + margin)
        .attr('y', margin)
        .attr('text-anchor', 'middle')
        .attr('font-weight', 'bold')
        .text('Grade Distribution');

    // x-axis and label
    canvas.append('g')
            .attr('transform', `translate(${margin}, ${chartHeight})`)
            .call(d3.axisBottom(xScale));

    svg.append('text')
        .attr('x', margin + chartWidth / 2 + margin)
        .attr('y', chartHeight + 2 * margin - 15)
        .attr('text-anchor', 'middle')
        .attr('font-weight', 'bold')
        .text('Grade');

    // y-axis and label
    canvas.append('g')
            .attr('transform', `translate(${margin}, 0)`)
            .call(d3.axisLeft(yScale));

    svg.append('text')
        .attr('x', margin - (chartWidth / 2))
        .attr('y', margin)
        .attr('transform', 'rotate(-90)')
        .attr('text-anchor', 'start')
        .attr('font-weight', 'bold')
        .text('Frequency (%)');
    
    // the bar chart
    const bars = canvas.selectAll('rect')
                    .data(plotData)
                    .enter()
                        .append('rect')
                            .attr('x', (data) => margin + xScale(data.letter))
                            .attr('y', chartHeight)
                            .attr('height', 0)
                            .attr('width', xScale.bandwidth())
                            .attr('fill', (data) => colourScale(data.freq))
                            .on('mouseenter', function(source, index) {
                                d3.select(this)
                                .transition()
                                .duration(200)
                                .attr('opacity', 0.5);
                            })
                            .on('mouseleave', function(source, index) {
                                d3.select(this)
                                    .transition()
                                    .duration(200)
                                    .attr('opacity', 1.0);
                            });
    bars.transition()
        .ease(d3.easeElastic)
        .duration(800)
        .delay((data, index) => index * 50)
        .attr('y', (data) => yScale(data.freq))
        .attr('height', (data) => chartHeight - yScale(data.freq));
}

function getGrade(mark) {
    if (mark < 50.0) {
        return 'F';
    } else if (mark < 60.0) {
        return 'D';
    } else if (mark < 70.0) {
        return 'C';
    } else if (mark < 80.0) {
        return 'B';
    } else {
        return 'A';
    }
}
