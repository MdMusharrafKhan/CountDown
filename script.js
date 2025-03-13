document.addEventListener("DOMContentLoaded", function() {
    let x;
    function counter(){
        clearInterval(x);
        const startInput = document.getElementById("startDate").value;
        const endInput = document.getElementById("endDate").value;

        const startDate = new Date(startInput).getTime();
        const endDate = new Date(endInput).getTime();

        if(isNaN(startDate) || isNaN(endDate)){
            alert("Invalid date");
            return;
        }
        if(!startDate || !endDate)
        {
            alert("Enter both the start and end dates");
            return;
        }
        if(startDate>=endDate)
        {
            alert("Invalid date");
            return;
        }
        const now = new Date().getTime();
        if(startDate>now)
        {
            alert("Timer will start in future");
            return;
        }
        

        //Reset UI
        document.getElementById("countdown").innerHTML = `
            <div><span id="days">00</span> Days</div>
            <div><span id="hours">00</span> Hrs</div>
            <div><span id="minutes">00</span> Min</div>
            <div><span id="seconds">00</span> Sec</div>
        `;
        document.getElementById("progress-bar").style.width = "0%";
        document.getElementById("progress-text").innerHTML = "0%";

        function updateTimer(){
            const currentD = new Date().getTime();
            const distancePending = endDate - currentD;

            const distanceCovered = currentD - startDate; //progress increase

            //calcuating the days, hrs, min, sec

            const days = Math.floor(distancePending/(24*60*60*1000));
            const hrs = Math.floor((distancePending % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
            const min = Math.floor((distancePending%(60*60*1000))/(60*1000));
            const sec = Math.floor((distancePending%(60*1000)/1000));

            //Populate into the UI

            document.getElementById("days").innerHTML = isNaN(days) ? 0 : days;
            document.getElementById("hours").innerHTML = isNaN(hrs) ? 0 : hrs;
            document.getElementById("minutes").innerHTML = isNaN(min) ? 0 : min;
            document.getElementById("seconds").innerHTML = isNaN(sec) ? 0 : sec;

            //Progress-bar populating into UI
        
            // proText.style.left = percentageBarDistance+"%";

            if(distancePending<=0){
                clearInterval(x);
                let col = document.getElementById("countdown");
                col.innerHTML = "Time Expired!";
                col.style.cssText = "color:black; font-size: x-large; font-style: oblique";
                document.getElementById("progress-bar").style.width = "100%" 
                let lim = document.getElementById("progress-text");
                lim.innerHTML = "100%";
                lim.style.left="95%";
                return;
            }
            else{
                //Percentage bar progress
                const totalDistance = endDate - startDate;
                const percentageBarDistance = (distanceCovered/totalDistance)*100;
                document.getElementById("progress-bar").style.width = percentageBarDistance+"%";
                let proText = document.getElementById("progress-text");
                proText.innerHTML = Math.floor(percentageBarDistance)+"%";
                proText.style.left = `min(${percentageBarDistance}%, 95%)`;
                col = document.getElementById("countdown");
            }
            
            // if (percentageBarDistance > 100) percentageBarDistance = 100;
            
        }
        updateTimer();
        x = setInterval(updateTimer, 1000);
    }
    // window.counter = counter; Used when function is defined in global scope
    document.getElementById("buttonOnClick").addEventListener("click", counter);
});

    
   