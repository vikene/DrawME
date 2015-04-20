 /* Copyright Vigneash Sundar 2015 */
/* you can use this code provided you give proper credits to Author */
$('document').ready( function ()
{
    var data;
    var socket = io();
   
    var canny = document.getElementById("drawer");
    
    if(canny)
    {
            var context = canny.getContext("2d");
            context.lineWidth = "6";
            context.strokeStyle = "red";
            var ccx,ccy,ccx1,ccy1;
            var lock_down = false;
            var count = 0;
            $(canny).mousedown(
            
            function (e)
                {
                    context.beginPath();
                    ccx = e.pageX - canny.offsetLeft;
                    ccy = e.pageY - canny.offsetTop;
                    context.moveTo(ccx,ccy);
                    lock_down = true;
                   
                    socket.emit("drawing_onprocess",ccx+":"+ccy+":"+"0");
                    count++;
                    
                
                }).mousemove( function (e){
            
                    if(lock_down == true)
                    {
                        ccx1 = e.pageX - canny.offsetLeft;
                        ccy1 = e.pageY - canny.offsetTop;
       
                           socket.emit("drawing_onprocess",ccx1+":"+ccy1+":"+"1");
                        count++;
                        context.lineTo(ccx1,ccy1);
                        
                        context.stroke();
                        
                         data = context.getImageData(0,0,512,512);
                var canny2 = document.getElementById("drawer2");
                var ctx = canny2.getContext("2d");
                ctx.putImageData(data,0,0);
                       
                        
                    }
            
            } ) .mouseup(function(e) 
        {
            context.closePath();
            lock_down = false;
             
        
     
                
        });
          $(canny).on('vmousedown',
            
            function (e)
                {
                    context.beginPath();
                    ccx = e.pageX - canny.offsetLeft;
                    ccy = e.pageY - canny.offsetTop;
                    context.moveTo(ccx,ccy);
                    lock_down = true;
                  db.child(count).set(ccx+":"+ccy+":"+"0");
                    count++;
                    
                
                }).on('vmousemove', function (e){
            
                    if(lock_down == true)
                    {
                        ccx1 = e.pageX - canny.offsetLeft;
                        ccy1 = e.pageY - canny.offsetTop;
                        db.child(count).set(ccx1+":"+ccy1+":"+"1");
                        count++;
                        context.lineTo(ccx1,ccy1);
                        
                        context.stroke();
                        
                         
               
                       
                        
                    }
            
            } ) .on('vmouseup',function(e) 
        {
            context.closePath();
            lock_down = false;
             
        
     
                
        });
       /*function paintit(snapshot)
        {
           var dataa = snapshot.val().split(":");
            if(dataa[2] == 0)
            {
                    context.closePath();
                context.beginPath();
                context.moveTo(dataa[0],dataa[1]);
            }
            else{
           
                           
            context.lineTo(dataa[0],dataa[1]);
            context.stroke();
            }
        }*/
      
        socket.on('paintit',function(snap){
           
             var dataa = snap.split(":");
            console.log(snap);
            if(dataa[2] == 0)
            {
                    context.closePath();
                context.beginPath();
                context.moveTo(dataa[0],dataa[1]);
            }
            else{
           
                           
            context.lineTo(dataa[0],dataa[1]);
            context.stroke();
            }   
        
        })
        
        $('#clear').click(function () {
     //      db.remove();
            location.reload();
        });
        
        function cleanit(snapshot)
        {
            location.reload();
        }
     
            
    }
    
    
    

});

