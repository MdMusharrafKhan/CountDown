let x;
function counter(){
    clearInterval(x);
    const startInput = document.getElementById("startDate").value;
    const endInput = document.getElementById("endDate").value;

    const startDate = new Date(startInput).getTime();
    const endDate = new Date(endInput).getTime();

    if(!startDate || !endDate)
    {
        alert("Enter both the start and end dates");
    }
    if(startDate>endDate)
    {
        alert("Invalid date");
        return;
    }
    const now = new Date().getTime();
    if(startDate>now)
    {
        alert("Timer will start in future");
    }
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

        document.getElementById("days").innerHTML = days;
        document.getElementById("hours").innerHTML = hrs;
        document.getElementById("minutes").innerHTML = min;
        document.getElementById("seconds").innerHTML = sec;

        //Progress-bar populating into UI
        const totalDistance = endDate - startDate;
        const percentageBarDistance = (distanceCovered/totalDistance)*100;
        document.getElementById("progress-bar").style.width = percentageBarDistance+"%";
        let proText = document.getElementById("progress-text");
        proText.innerHTML = Math.floor(percentageBarDistance)+"%"
        proText.style.left = percentageBarDistance+"%";

        if(distancePending<=0){
            clearInterval(x);
            let col = document.getElementById("countdown");
            col.innerHTML = "Time Expired!";
            col.style.cssText = "color:black; font-size: x-large; font-style: oblique";
            document.getElementById("progress-bar").style.width = "100%" 
            let lim = document.getElementById("progress-text")
            lim.innerHTML = "100%";
            lim.style.left="95%";
        }
        // progressText.style.left = `min(${percentageBarDistance}%, 95%)`
        // if (percentageBarDistance > 100) percentageBarDistance = 100;

    }
    updateTimer();
    x = setInterval(updateTimer, 1000);
}