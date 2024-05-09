$(function() {
		
	$('#time').jclock();
	
	/* columnise folders */
	var fN = $('.folder').length;
	var fH = $('#folders').height() + 100;
	var wH = $(window).height();
	var wW = $(window).width();
	
	if(fH > wH)
	{
		var fIH = fH / fN;
		var fpW = wH / fIH;
		fpW = parseInt(fpW);
		var colN = ( parseInt(fH / wH)+1 );
		
		for(i=0;i<(colN-1);i++) {
			$('#folders').after('<div id="folders'+(i+2)+'" class="folders"/>');
			$('.folder_wrapper').slice((fpW*(i+1)), ((fpW*2)*(i+1))).appendTo('#folders'+(i+2));
		}
	}
	
	/* make folders draggable and invert icon when drag starts */
	$('.folder').draggable({
		scroll: false
	});
	

});

document.addEventListener("DOMContentLoaded", function() {
    var modal1 = document.getElementById("myModal1");
    var btn1 = document.getElementById("amelia-btn");
    var span1 = modal1.getElementsByClassName("close")[0];

    btn1.onclick = function() {
        modal1.style.display = "block";
    }

    span1.onclick = function() {
        modal1.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal1) {
            modal1.style.display = "none";
        }
    }
});

document.addEventListener("DOMContentLoaded", function() {
    var modal2 = document.getElementById("myModal2");
    var btn2 = document.getElementById("loves");
    var span2 = modal2.getElementsByClassName("close")[0];

    btn2.onclick = function() {
        modal2.style.display = "block";
    }

    span2.onclick = function() {
        modal2.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal2) {
            modal2.style.display = "none";
        }
    }
});

document.addEventListener("DOMContentLoaded", function() {
    var modal3 = document.getElementById("myModal3");
    var btn3 = document.getElementById("about-fangrrrl");
    var span3 = modal3.getElementsByClassName("close")[0];

    btn3.onclick = function() {
        modal3.style.display = "block";
    }

    span3.onclick = function() {
        modal3.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal3) {
            modal3.style.display = "none";
        }
    }
});
