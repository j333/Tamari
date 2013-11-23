		(function() {
			var canvas = document.querySelector('#paint');
			var ctx = canvas.getContext('2d');
			
			var sketch = document.querySelector('#sketch');
			var sketch_style = getComputedStyle(sketch);
			canvas.width = parseInt(sketch_style.getPropertyValue('width'));
			canvas.height = parseInt(sketch_style.getPropertyValue('height'));

			var tmp_canvas = document.createElement('canvas');
			var tmp_ctx = tmp_canvas.getContext('2d');
			tmp_canvas.id = 'tmp_canvas';
			tmp_canvas.width = canvas.width;
			tmp_canvas.height = canvas.height;

			tmp_canvas.style.display = 'none';
			
			sketch.appendChild(tmp_canvas);

			var mouse = {x: 0, y: 0};
			var last_mouse = {x: 0, y: 0};
			
			var ppts = [];
			
			tmp_canvas.addEventListener('mousemove', function(e) {
				mouse.x = typeof e.offsetX !== 'undefined' ? e.offsetX : e.layerX;
				mouse.y = typeof e.offsetY !== 'undefined' ? e.offsetY : e.layerY;
			}, false);
			
			canvas.addEventListener('mousemove', function(e) {
				mouse.x = typeof e.offsetX !== 'undefined' ? e.offsetX : e.layerX;
				mouse.y = typeof e.offsetY !== 'undefined' ? e.offsetY : e.layerY;
			}, false);
			
            tmp_ctx.fillStyle = 'white';
            tmp_ctx.fill();
            tmp_ctx.fillRect(0,0,canvas.width,canvas.height);

			tmp_canvas.removeEventListener('mousemove', onPaint, false);
			ctx.globalCompositeOperation = 'source-over';
			ctx.drawImage(tmp_canvas, 0, 0);
			tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height);
			ppts = [];
			
			var onPaint = function() {
				
				ppts.push({x: mouse.x, y: mouse.y});
				
				if (ppts.length < 3) {
					var b = ppts[0];
					tmp_ctx.beginPath();
					tmp_ctx.arc(b.x, b.y, tmp_ctx.lineWidth / 2, 0, Math.PI * 2, !0);
					tmp_ctx.fill();
					tmp_ctx.closePath();
					
					return;
				}
				
				tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height);
				
				tmp_ctx.beginPath();
				tmp_ctx.moveTo(ppts[0].x, ppts[0].y);
				
				for (var i = 1; i < ppts.length - 2; i++) {
					var c = (ppts[i].x + ppts[i + 1].x) / 2;
					var d = (ppts[i].y + ppts[i + 1].y) / 2;
					
					tmp_ctx.quadraticCurveTo(ppts[i].x, ppts[i].y, c, d);
				}
				
				tmp_ctx.quadraticCurveTo(
					ppts[i].x,
					ppts[i].y,
					ppts[i + 1].x,
					ppts[i + 1].y
				);
				tmp_ctx.stroke();
				
			};
			
			canvas.addEventListener('mousedown', function(e) {
				canvas.addEventListener('mousemove', onErase, false);
				
				mouse.x = typeof e.offsetX !== 'undefined' ? e.offsetX : e.layerX;
				mouse.y = typeof e.offsetY !== 'undefined' ? e.offsetY : e.layerY;
				
				ppts.push({x: mouse.x, y: mouse.y});
				
				onErase();
			}, false);
			
			canvas.addEventListener('mouseup', function() {
				canvas.removeEventListener('mousemove', onErase, false);
				
				ppts = [];
			}, false);
			
			var onErase = function() {
				
				ppts.push({x: mouse.x, y: mouse.y});
				
				ctx.globalCompositeOperation = 'destination-out';
				ctx.fillStyle = 'rgba(0,0,0,1)';
				ctx.strokeStyle = 'rgba(0,0,0,1)';
				ctx.lineWidth = 50;
				
				if (ppts.length < 3) {
					var b = ppts[0];
					ctx.beginPath();
					ctx.arc(b.x, b.y, ctx.lineWidth / 2, 0, Math.PI * 2, !0);
					ctx.fill();
					ctx.closePath();
					
					return;
				}
				
				ctx.beginPath();
				ctx.moveTo(ppts[0].x, ppts[0].y);
				
				for (var i = 1; i < ppts.length - 2; i++) {
					var c = (ppts[i].x + ppts[i + 1].x) / 2;
					var d = (ppts[i].y + ppts[i + 1].y) / 2;
					
					ctx.quadraticCurveTo(ppts[i].x, ppts[i].y, c, d);
				}

				ctx.quadraticCurveTo(
					ppts[i].x,
					ppts[i].y,
					ppts[i + 1].x,
					ppts[i + 1].y
				);
				ctx.stroke();	
			};
		}());