import React from 'react';
import Info from './components/info';
import Form from './components/form';
import Weather from './components/weather';

const API_KEY = "67c9ed399555f900c2755eae4f1b5912";

class App extends React.Component {
  
  state = {
    temp: undefined,
    city: undefined,
    country: undefined,
    sunrise: undefined,
    pressure: undefined,
    error: undefined
  }

  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;


    if(city){
      const api_url = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
      const data = await api_url.json();

      var sunset = data.sys.sunset;
      var date = new Date();
      date.setTime(sunset);
      var sunset_date = date.getHours() + ":" + date.getMinutes();

      

      this.setState({
        temp: data.main.temp,
        city: data.name,
        country: data.sys.country,
        sunset: sunset_date,
        pressure: data.main.pressure,
        error: ''
      }); 
    } else {
      this.setState({
        temp: undefined,
        city: undefined,
        country: undefined,
        sunset: undefined,
        pressure: undefined,
        error: "Введите название города"
      })
    }
  }

  render(){

    return (
      <div className="wrapper">
        <div className="main">
          <div className="container">
            <div className="row">
              <div className="col-sm-5 info">
                      <Info />
              </div>
              <div className="col-sm-17 form">
                <Form weatherMethod={this.getWeather} />
                <Weather 
                  temp={this.state.temp}
                  city={this.state.city}
                  country={this.state.country}
                  pressure={this.state.pressure}
                  sunset={this.state.sunset}
                  error={this.state.error}
                />
              </div>            
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

