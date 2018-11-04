
//creating a react context api
const MyContext = React.createContext();

//creating a provider component
class MyProvider extends React.Component {
    state = {
        text: "ankit abhinav",
        selectClientStatus: true,
        afterClientSelect: false,
        currentClient: 'denny',

        changeSelectClientStatus: (e) => {


            console.log("toggle clicked----");

            this.setState({
                selectClientStatus: false,
                afterClientSelect: true,
                currentClient: e.target.value

            })

        },

        changeAfterClientStatus: () => {
            console.log("toggle clicked----");

        },
        updateClient: (e) => {

        }
    }
    render() {
        return (
            <MyContext.Provider value={this.state}>
                {this.props.children}
            </MyContext.Provider>
        )
    }
}

class D3Chart extends React.Component {
    constructor(props) {
        super();

        this.state = {
            response: [],
            dates_months_years: [],
            weeks: [],
            graphDataset: [0, 0],
            graphDetail:[],
            inBetweenData: [],
            monthlyTotal: [],
            yearlyTotal: [],
           
        }

        this.generateGraph = this.generateGraph.bind(this);
        this.getDetailsFromApiAsync = this.getDetailsFromApiAsync.bind(this);
        this.bindResponse = this.bindResponse.bind(this);
        this.getDatesFromApiAsync = this.getDatesFromApiAsync.bind(this);
        this.bindDatesResponse = this.bindDatesResponse.bind(this);
        this.getWeeks = this.getWeeks.bind(this);
        this.getMonday = this.getMonday.bind(this);
        this.getSunday = this.getSunday.bind(this);
        this.changeGraph = this.changeGraph.bind(this);
        this.getInBetweenData = this.getInBetweenData.bind(this);
        this.getMonthlyData = this.getMonthlyData.bind(this);
        this.getYearlyData = this.getYearlyData.bind(this);
    }

    componentDidMount() {
        // this.generateGraph();
        this.getDetailsFromApiAsync(this.props.client_name);
        this.getDatesFromApiAsync(this.props.client_name);
        console.log("Client Name " + this.props.client_name);

        $('.tabs').tabs();
        $('select').formSelect();

    }

    bindResponse(obj) {

        this.setState({
            response: obj
        })

    }

    getMonday(d) {
        d = new Date(d);
        var day = d.getDay(),
            diff = d.getDate() - day + (day == 0 ? -6 : 1);
        var dateObj = new Date(d.setDate(diff));
        var month = dateObj.getUTCMonth() + 1; //months from 1-12
        var day = dateObj.getUTCDate();
        var year = dateObj.getUTCFullYear();

        var newdate = year + "-" + month + "-" + day;
        return newdate
    }

    getSunday(d) {
        d = new Date(d);
        var lastday = d.getDate() - (d.getDay() - 1) + 6;
        var hold = new Date(d.setDate(lastday));
        var month = hold.getUTCMonth() + 1; //months from 1-12
        var day = hold.getUTCDate();
        var year = hold.getUTCFullYear();



        var newdate = year + "-" + month + "-" + day;
        return newdate
    }

    getWeeks() {
        var weeks = [];
        var distinct_weeks = [];
        var hold = this.state.dates_months_years;
        for (var i = 0; i < hold[2]['data'].length; i++) {
            var d1 = hold[2]['data'][i].dates;
            weeks[i] = { date: d1, week_start: this.getMonday(d1), week_end: this.getSunday(d1) }
        }


        this.setState({
            weeks: weeks
        }, console.log(weeks))

    }

    bindDatesResponse(obj) {
        this.setState({
            dates_months_years: obj
        })
    }

    getDetailsFromApiAsync(query) {
        return fetch('http://backrest.in/full/api/getDetails.php?client=' + query)
            .then((response) => response.json())
            .then((responseJson) => {
                this.bindResponse(responseJson);
                console.log(responseJson);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    getMonthlyData(e) {

        const { param } = e.target.dataset;
        console.log(param);
        var month = param;

        return fetch('http://backrest.in/full/api/getMonthly.php?month=' + month + '&client=' + this.props.client_name)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log('this is in Monthly function');
                console.log(responseJson);
                this.setState({
                    monthlyTotal: responseJson
                })
                this.changeGraphMonthly();

            })
            .catch((error) => {
                console.log(error);
            });


    }

    getYearlyData(e) {

        const { param } = e.target.dataset;
        console.log(param);
        var year = param;

        return fetch('http://backrest.in/full/api/getYearly.php?year=' + year + '&client=' + this.props.client_name)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log('this is in Yearly function');
                console.log(responseJson);
                this.setState({
                    yearlyTotal: responseJson
                })
                this.changeGraphYearly();

            })
            .catch((error) => {
                console.error(error);
            });


    }

    getDatesFromApiAsync(query) {
        return fetch('http://backrest.in/full/api/getDatesMonthsYears.php?client=' + query)
            .then((response) => response.json())
            .then((responseJson) => {
                this.bindDatesResponse(responseJson);
                console.log(responseJson);
                this.getWeeks();
            })
            .catch((error) => {
                console.error(error);
            });
    }

    getInBetweenData(e) {

        const { param } = e.target.dataset;
        console.log(param);
        var h = param;
        var res = param.split("&");
        console.log(res[0] + "2nd" + res[1]);


        return fetch('http://backrest.in/full/api/getInBetweenDates.php?client=' + this.props.client_name + '&start_date=' + res[0] + "&end_date=" + res[1])
            .then((response) => response.json())
            .then((responseJson) => {
                this.bindDatesResponse(responseJson);
                console.log('this is in between dates function');
                console.log(responseJson);
                this.setState({
                    inBetweenData: responseJson
                })
                this.changeGraph();

            })
            .catch((error) => {
                console.error(error);
            });

    }

    changeGraph() {
        alert("change graph clicked");
        d3.selectAll("svg > *").remove();
        var new_data = [];
        var detail_data = [];

        if (this.state.inBetweenData.length > 0) {
            for (var i = 0; i < this.state.inBetweenData.length; i++) {
                var num = this.state.inBetweenData[i].hours;
                //num=num.toFixed();
                new_data[i] = Math.round(num);
                detail_data[i]=this.state.inBetweenData[i].start_date+'\n'+this.state.inBetweenData[i].stop_date+'\n'+this.state.inBetweenData[i].start_time+'\n'+this.state.inBetweenData[i].stop_time;
            }

        }

        //console.log(new_data);

        this.setState({
            graphDataset: new_data,
            graphDetail:detail_data
        })

        this.generateGraph();
    }

    changeGraphMonthly() {
        alert("change graph clicked");
        d3.selectAll("svg > *").remove();
        var new_data = [];
        new_data[0] = this.state.monthlyTotal[0].total_hours;

        this.setState({
            graphDataset: new_data
        })

        this.generateGraph();
    }

    generateObjects() {

    }

    changeGraphYearly() {
        alert("change graph clicked");
        d3.selectAll("svg > *").remove();
        var new_data = [];
        new_data[0] = this.state.yearlyTotal[0].total_hours;

        this.setState({
            graphDataset: new_data
        })

        this.generateGraph();
    }



    generateGraph() {
        // javascript
        var dataArray = this.state.graphDataset;
        var detail= this.state.graphDetail;

        // Create variable for the SVG
        var svg = d3.select("svg")
            .attr("height", "400px")
            .attr("width", "100%");

        // Select, append to SVG, and add attributes to rectangles for bar chart
        svg.selectAll("rect")
            .data(dataArray)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("height", function (d, i) { return (d * 10) })
            .attr("width", "40")
            .attr("x", function (d, i) { return (i * 60) + 25 })
            .attr("y", function (d, i) { return 400 - (d * 10) });

          
        // Select, append to SVG, and add attributes to text
        svg.selectAll("text")
            .data(dataArray)
            .enter().append("text")
            .text(function (d) { return d+' hrs' })
            .attr("class", "text")
            .attr("x", function (d, i) { return (i * 60) + 36 })
            .attr("y", function (d, i) { 
                var res=400-(d*6);
                if(res<0){res=34}
                return res
            });


            svg.selectAll("rect")
            .on("mouseover", function(){
                d3.select(this)
                  .style("fill", "orange");
      
                // Get current event info
                console.log(d3.event);
                
                // Get x & y co-ordinates
                console.log(d3.mouse(this));
            })
            .on("mouseout", function(){
                d3.select(this)
                  .style("fill", "grey")
            });    


            this.getDatesFromApiAsync(this.props.client_name);
            

    }


    render() {

        var objstyle = { 'overflow-y': 'auto', 'height': '300px' }

        var tabs_style = { 'height': '300px' }

        var obj = [];
        if (this.state.weeks.length > 0) {
            for (var i = 0; i < this.state.weeks.length; i++) {

                var start = this.state.weeks[i].week_start;
                var end = this.state.weeks[i].week_end;
                var para = start + "&" + end;
                obj.push(<a data-param={para} key={i + 101} onClick={this.getInBetweenData} class="collection-item">{this.state.weeks[i].week_start} to {this.state.weeks[i].week_end}</a>);
            }
        }

        var obj_months = [];
        if (this.state.dates_months_years.length > 0) {
            for (var i = 0; i < this.state.dates_months_years[1].length; i++) {

                var month = this.state.dates_months_years[1]['data'][i].months;
                console.log("Month:" + month);
                obj_months.push(<a data-param={month} key={i + 1001} onClick={this.getMonthlyData} class="collection-item">{month}</a>);
            }
        }
        else{console.log('months false')}

        var obj_yearly = [];
        if (this.state.dates_months_years.length > 0) {
            for (var i = 0; i < this.state.dates_months_years[0].length; i++) {

                var year = this.state.dates_months_years[0]['data'][i].years;
                console.log("year:" + year);
                obj_yearly.push(<a data-param={year} key={i + 2001} onClick={this.getYearlyData} class="collection-item">{year}</a>);
            }
        }
        else{console.log('years false')}


        return (
            <React.Fragment>


                <div class="row">
                    <div class="col s12"><h4>Current client: {this.props.client_name}</h4></div>
                </div>
                <div class="row">

                    <div class="col m7 s12">
                    <svg></svg>
                    </div>
                    <div class="col m5 s12" >

                        <ul id="tabs-swipe-demo" class="tabs">
                            <li class="tab col s3"><a href="#test-swipe-1">Weekly</a></li>
                            <li class="tab col s3"><a href="#test-swipe-2">Monthly</a></li>
                            <li class="tab col s3"><a href="#test-swipe-3">Yearly</a></li>
                        </ul>
                        <div id="test-swipe-1" class="col s12 ">
                            <div style={objstyle}>
                                <ul class="collection">
                                    {obj}
                                </ul>
                            </div>

                        </div>
                        <div id="test-swipe-2" class="col s12 " style={tabs_style}>
                            <ul class="collection">
                            <a class="collection-item">1-January, 2-February...so on</a>
                                {obj_months}
                            </ul>
                        </div>
                        <div id="test-swipe-3" class="col s12 " style={tabs_style}>
                            <ul class="collection">
                            <a class="collection-item">Select Years</a>
                                {obj_yearly}
                            </ul>
                        </div>
                    </div>
                </div>

            </React.Fragment>
        )
    }
}

class MainView extends React.Component {
    constructor(props) {
        super();
    }

    componentDidMount() {

    }

    render() {
        var select_client_style = { 'margin-top': '10%' }

        return (
            <MyContext.Consumer>
                {(context) => (
                    <React.Fragment>


                        {context.selectClientStatus &&


                            <React.Fragment>
                                <div class="col m3 hide-on-small-only"></div>
                                <div class="col m6 s12" style={select_client_style}>
                                    <SelectClient />
                                </div>
                                <div class="col m3 hide-on-small-only"></div>
                            </React.Fragment>

                        }

                        <div id="d3chart"></div>

                        {context.afterClientSelect &&

                            <React.Fragment>
                                <D3Chart client_name={context.currentClient} />
                            </React.Fragment>

                        }

                    </React.Fragment>
                )}
            </MyContext.Consumer>
        )
    }

}

class SelectClient extends React.Component {
    constructor(props) {
        super();


    }

    componentDidMount() {
        $('select').formSelect();

    }

    render() {
        return (

            <MyContext.Consumer>
                {(context) => (
                    <React.Fragment>

                        <div class="input-field">
                            <select class="icons" onChange={context.changeSelectClientStatus}>
                                <option value="" disabled selected>Choose your option</option>
                                <option data-param="denny" value="denny" data-icon="images/dummy.jpg" class="left" >denny</option>
                                <option data-param="harry" value="harry" data-icon="images/dummy.jpg" class="left">harry</option>


                            </select>
                            <label>Select Client</label>
                        </div>

                    </React.Fragment>
                )}
            </MyContext.Consumer>


        )
    }



}

class ActionBar extends React.Component {
    componentDidMount() {
        $('.tooltipped').tooltip();
        $('.sidenav').sidenav();
    }
    render() {
        return (

            <MyContext.Consumer>
                {(context) => (
                    <React.Fragment>
                        <nav>
                            <div class="nav-wrapper">
                                <a href="#!" class="brand-logo">Logo</a>
                                <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
                                <ul class="right hide-on-med-and-down">
                                    <li><a href="sass.html">Sass</a></li>
                                    <li><a href="badges.html">Components</a></li>
                                    <li><a href="collapsible.html">Javascript</a></li>
                                    <li><a href="mobile.html">Mobile</a></li>
                                </ul>
                            </div>
                        </nav>

                        <ul class="sidenav" id="mobile-demo">
                            <li><a href="sass.html">Sass</a></li>
                            <li><a href="badges.html">Components</a></li>
                            <li><a href="collapsible.html">Javascript</a></li>
                            <li><a href="mobile.html">Mobile</a></li>
                        </ul>
                    </React.Fragment>


                )}

            </MyContext.Consumer>
        )
    }
}

class MainComponent extends React.Component {
    constructor(props) {
        super();

        this.state = {
            response: [],
        }

        this.getResponse = this.getResponse.bind(this);

    }

    componentDidMount() {

    }

    getResponse() {

    }




    render() {

        var container_styles = { 'background-color': 'white', 'margin-top': '10px' }

        return (
            <MyProvider>

                <MyContext.Consumer>
                    {(context) => (
                        <React.Fragment>


                            <ActionBar />

                            <div  >
                                <div class="row" style={container_styles}>
                                    <MainView />
                                </div>
                            </div>


                        </React.Fragment>

                    )}
                </MyContext.Consumer>



            </MyProvider>

        )

    }
}

ReactDOM.render(
    <MainComponent />, document.getElementById("app")


);