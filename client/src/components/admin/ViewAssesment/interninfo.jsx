import React from 'react'
import "../../test.css";
import "./mentor.css"
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';



const InternInfo = ({feedbackvalue}) => {
  return (     
    <div >
       <p>Intern's Information from Evaluator</p>
        <div className="assesment-form">
        <form>

            <div className="form-group">
              <label htmlFor="">Email<span>*</span></label>
              <input type="email"  value={feedbackvalue.intern_Email ||''}  /> 
            </div>
            
            <div className="form-group">
              <label htmlFor="">Intern's Name<span>*</span></label>
              <input type="text" value={feedbackvalue.intern_name ||''}  />
            </div>
            <div className="form-group">
              <label htmlFor="">Intern's Designation (e.g., Front-end Software Developer)<span>*</span></label>
              <input type="text" value={feedbackvalue.intern_desc ||''}  />
            </div>
            <div className="form-group">
              <label htmlFor="">Intern's Joining Date  (e.g., January 7, 2023)<span>*</span></label>
              <input type="text"  value={feedbackvalue.intern_join ||''}  />
            </div>
                
            <div className="form-group">
            <label htmlFor="">Intern's Last Working Day (e.g., January 7, 2023)<span>*</span></label>
              <input type="text" value={feedbackvalue.intern_lastday ||''}  />
            </div>

            <div className="form-group">
            <label htmlFor="">Your role with this intern<span>*</span></label>
            </div>


            <div className="form-group1">
            <FormControl>
           
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="Senior Manager"
                    name="radio-buttons-group" 
                    value={feedbackvalue.intern_role ||''}    >
                    <FormControlLabel value="Senior Manager" control={<Radio />} label="Senior Manager (e.g., CEO/CTO/MD/Team Lead)" />
                    <FormControlLabel value="Line Manager" control={<Radio />} label="Line Manager (e.g., Mentor/Supervisor)" />
                    <FormControlLabel value="Both" control={<Radio />} label="Both" />
                </RadioGroup>
            </FormControl>
            </div>

            <div className="form-group">
            <label htmlFor="">Working Location of Intern<span>*</span></label>
            </div>


            <div className="form-group1">
            <FormControl>
            <RadioGroup row  aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={feedbackvalue.intern_location ||''}   >
                
                    <FormControlLabel style={{ marginLeft:"0px"}} value="Fully on-site" control={<Radio />} label="Fully on-site" />
                    <FormControlLabel style={{ marginLeft:"150px"}} value="About 25% remote " control={<Radio />} label="About 25% remote" />
                    <FormControlLabel style={{ marginLeft:"0px"}} value="About 50% remote " control={<Radio />} label="About 50% remote" />
                    <FormControlLabel style={{ marginLeft:"105px"}} value="About 75% remote " control={<Radio />} label="About 75% remote" />
                    <FormControlLabel style={{ marginLeft:"0px"}} value="Fully remote " control={<Radio />} label="Fully remote" />
                    
                </RadioGroup>
            </FormControl>
            </div>
        </form>
        
      </div>

  
</div>
  )
}
export default InternInfo