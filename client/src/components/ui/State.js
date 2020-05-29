import React from "react";

const State = (props) => {
  return (
    <select
      name={props.name}
      className="custom-select"
      onChange={props.onChange}
      value={props.value}
    >
      <option value="" disabled selected hidden>
        Select State
      </option>
      <option value="Andhra_Pradesh">Andhra Pradesh</option>
      <option value="Andaman_and_Nicobar Islands">
        Andaman and Nicobar Islands
      </option>
      <option value="Arunachal Pradesh">Arunachal Pradesh</option>
      <option value="Assam">Assam</option>
      <option value="Bihar">Bihar</option>
      <option value="Chandigarh">Chandigarh</option>
      <option value="Chhattisgarh">Chhattisgarh</option>
      <option value="Dadar_and_Nagar Haveli">Dadar and Nagar Haveli</option>
      <option value="Daman_and_Diu">Daman and Diu</option>
      <option value="Delhi">Delhi</option>
      <option value="Lakshadweep">Lakshadweep</option>
      <option value="Puducherry">Puducherry</option>
      <option value="Goa">Goa</option>
      <option value="Gujarat">Gujarat</option>
      <option value="Haryana">Haryana</option>
      <option value="Himachal_Pradesh">Himachal Pradesh</option>
      <option value="Jammu_and_Kashmir">Jammu and Kashmir</option>
      <option value="Jharkhand">Jharkhand</option>
      <option value="Karnataka">Karnataka</option>
      <option value="Kerala">Kerala</option>
      <option value="Madhya_Pradesh">Madhya Pradesh</option>
      <option value="Maharashtra">Maharashtra</option>
      <option value="Manipur">Manipur</option>
      <option value="Meghalaya">Meghalaya</option>
      <option value="Mizoram">Mizoram</option>
      <option value="Nagaland">Nagaland</option>
      <option value="Odisha">Odisha</option>
      <option value="Punjab">Punjab</option>
      <option value="Rajasthan">Rajasthan</option>
      <option value="Sikkim">Sikkim</option>
      <option value="Tamil_Nadu">Tamil Nadu</option>
      <option value="Telangana">Telangana</option>
      <option value="Tripura">Tripura</option>
      <option value="Uttar_Pradesh">Uttar Pradesh</option>
      <option value="Uttarakhand">Uttarakhand</option>
      <option value="West_Bengal">West Bengal</option>
    </select>
  );
};

export default State;
