import axios from "axios";

//max 10 API call per hour :'(
var apiKey="js-X56fZ3EDs8gMCsHU0o8VxMDDq1CWjwkJ5X4VsbH5RzZJPTau57rJpru60IpDJDiz";

export default {
  getZipcodes: function(zipcode, radius) {
    var query = "http://www.zipcodeapi.com/rest/"+apiKey+"/radius.json/"+zipcode+"/"+radius+"/mile";
    return axios.get(query)
  }
};
