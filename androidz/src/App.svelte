<script>
	import { onMount } from "svelte";
  
	let flashes = [];
	let interval;
  
	// Function to generate random lightning shapes
	function createFlashes() {
		flashes = Array.from({ length: 10 }, () => ({
			x1: Math.random() * 100 + "%",
			y1: Math.random() * 100 + "%",
			x2: Math.random() * 100 + "%",
			y2: Math.random() * 100 + "%",
			width: Math.random() * 20 + "px", // Increase the maximum width
			rotation: Math.random() * 360 + "deg" // Add random rotation
		}));
	}
  
	// Start flashing effect
	onMount(() => {
	  createFlashes();
	  interval = setInterval(() => createFlashes(), 1000); // Update flashes every second
  
	  const youtubeIframe = document.querySelector("iframe");
	  youtubeIframe.src += "?autoplay=1"; // Add autoplay parameter
  
	  return () => clearInterval(interval); // Clean up on destroy
	});

	let shows = [
		{ date: "Comming Soon", location: "To Be Decided", upcoming: true },
		{ date: "02.10.24", location: "Hasselt, België", upcoming: false },
		{ date: "27.09.24", location: "Nijlen, België", upcoming: false },
		{ date: "19.09.24", location: "Kortrijk, België", upcoming: false },
		{ date: "14.08.24", location: "Veurne, België", upcoming: false }
	];
  </script>
  
  <style>
	:global(body) {
	  margin: 0;
	  padding: 0;
	  background-color: black;
	  overflow: hidden;
	}

	.sixtyfour-a {
		font-family: "Sixtyfour", serif;
		font-optical-sizing: auto;
		color: white;
		font-weight: 400;
		font-style: normal;
		font-variation-settings:
			"BLED" 35,
			"SCAN" 5;
		font-size: 5rem; /* Make the text way bigger */
		text-align: center; /* Center the text */
		margin-top: 20px; /* Add some margin at the top */
	}
	.flash {
	  position: absolute;
	  background-color: white;
	  /* Simulate lightning with border and skew */
	  border: 5px solid white;
	  border-top: 0;
	  transform: skewX(-30deg) skewY(-30deg) rotate(var(--rotation));
	  animation: fade 0.5s ease-out forwards, glitch 0.2s infinite; /* Add glitch animation */
	}
  
	@keyframes fade {
	  0% {
		opacity: 1;
	  }
	  100% {
		opacity: 0;
	  }
	}

	@keyframes glitch {
		0% {
			transform: translate(0, 0);
		}
		33% {
			transform: translate(-5px, 5px);
		}
		66% {
			transform: translate(5px, -5px);
		}
		100% {
			transform: translate(0, 0);
		}
	}
  
	.video-container {
	  width: 100%; /* Make the video container full width */
	  margin-bottom: 20px;
	  padding: auto; /* Add some margin at the bottom */
	}
  
	iframe {
	  width: 100%; /* Make the iframe full width of the container */
	  height: 360px;
	  border: none;
	}

	.table-container {
		margin: 20px;
		padding: 20px;
		background-color: #1e1e1e;
		border-radius: 10px;
		color: white;
		font-family: Arial, sans-serif;
		position: relative;
		z-index: 1;
	}
	
	table {
		width: 100%;
		border-collapse: collapse;
	}
	
	th, td {
		padding: 10px;
		text-align: left;
		border-bottom: 1px solid #444;
	}
	
	th {
		background-color: #333;
	}
	
	tr.upcoming {
		background-color: #333;
	}
	
	tr.upcoming td {
		color: #fff;
	}
	
	tr.past {
		background-color: #222;
	}
	
	tr.past td {
		color: #888;
	}
  </style>
  
  <div>
	{#each flashes as flash (flash.x1 + flash.y1)}
	  <div class="flash" style="left: {flash.x1}; top: {flash.y1}; width: {flash.width}; --rotation: {flash.rotation};"></div>
	{/each}
	<h1 class="sixtyfour-a">A N D R O ! D Z</h1>
  
	<div class="video-container">
	  <iframe  height="642" src="https://www.youtube.com/embed/5In82sOFBkg" title="Back to you" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
	</div>
	
	<div class="table-container">
		<table>
			<thead>
				<tr>
					<th>Date</th>
					<th>Location</th>
				</tr>
			</thead>
			<tbody>
				{#each shows as show}
					<tr class={show.upcoming ? 'upcoming' : 'past'}>
						<td>{show.date}</td>
						<td>{show.location}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
  </div>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Sixtyfour&display=swap" rel="stylesheet">