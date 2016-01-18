<!doctype html>
<html>
<head>
	<meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta charset="utf-8">
	
		<title>How create http live streaming from Amazon? » Community Questions &amp; Answers </title>
	
	<meta name="viewport" content="width=device-width,initial-scale=1">
	<link href="../../related/favicon.png" rel="shortcut icon" type="image/png">
	<link href="//fonts.googleapis.com/css?family=Open+Sans:300,400,500,600,700" rel="stylesheet" type="text/css">
	<link href="//d3ilu1xuwhtfe2.cloudfront.net/e8e0ebd/css/style.css" rel="stylesheet" type="text/css">
	<link href="../../related/qa.css" rel="stylesheet" type="text/css">
	<link href="../../related/hybrid.css" rel="stylesheet" type="text/css">
	
	<link href="../../related/overrides.css" rel="stylesheet" type="text/css">
</head>
<body>

<div class='mast'>    <div class='container'>        <div class='row'>            <div class='col-sm-12'>                <div class='masthead'><h1>Titanium Community Questions & Answer Archive</h1><h2>We felt that 6+ years of knowledge should not die so this is the Titanium Community Questions &amp; Answer Archive</h2></div>            </div>        </div>    </div></div>

<main class="container">
	<div class="row">
		<div class="col-sm-12">
			
		</div>
	</div>
	<div class="row">
		<div class="col-sm-12">
			<article class="question-container">
	<div class="question">
		<header>
			<h1>How create http live streaming from Amazon?</h1>
		</header>
		<section>
			<p>Hi, in my app I have to show many remotly videos and in iOS for videos bigger then 20 mb we must create a streaming.<br>How can I create the http live streaming from video FILE.mp4 in Amazon S3 o CloudFront ?</p>
<p>Best regards<br>Lore</p>

		</section>
		<footer>
			<div class="author">
				&mdash; asked <span title="July 6th 2012, 4:36:28 am">July 6th 2012</span>
				by <span class='authorname'>Lorenzo Piccinini</span>
			</div>

			
				<ul class="tags">
					
						<li><span class='tagname'>amazon</span></li>
					
						<li><span class='tagname'>http live streaming</span></li>
					
						<li><span class='tagname'>ios</span></li>
					
				</ul>
			

			<section>
				<h5>0 Comments</h5>
				
			</section>
		</footer>
		<aside class="vote-box">
			<div class="score"><span>0</span> Votes</div>
			<div class="answers"><span>1</span> Answer</div>
		</aside>
	</div>

	<hr>

	<h3>1 Answer</h3>

	
		<ul class="answers">
			
				<li class="answer">
				
					<article id="answer-242628">
				
						<section>
							<p>This isn&#39;t really an Appcelerator&#x2F;Titanium question.  This is an apple HLS question.  However, you should first read the documentation regarding HLS on the Apple Developer site.</p>
<p><a href="developer.apple.com&#x2F;resources&#x2F;http-streaming&#x2F;">HTTP Live Streaming Resources</a></p>
<p>You will need to download the HLS tools and install them. Final Cut Pro X and Adobe Premiere allow you to export to HLS with multiple bit rates as well.</p>
<p>HLS is nothing more than an extended playlist system consisting of chunked up video or audio files and a text file (.ts or .m3u8) to tell the player about the chunked files (live streams a bit different)</p>
<p>These reside on a server accessible via HTTP such as your web server or, in your case, Amazon S3. The world needs read access to your S3 bucket so you have to set your perms correctly.</p>

						</section>
						<footer>
							<div class="author">
								&mdash; answered <span title="July 6th 2012, 11:33:51 am">July 6th 2012</span>
								by <span class='authorname'>Stephen Feather</span><br>
								<a class="icon-bg icon-link" href="question/139321/how-create-http-live-streaming-from-amazon#answer-242628" rel="permalink">permalink</a>
							</div>

							<h5>0 Comments</h5>
							
						</footer>
						<aside class="vote-box">
							<div class="score"><span>0</span> Votes</div>
						</aside>
					</article>
				</li>
			
		</ul>
	
</article>

		</div>
		<div class="col-sm-3"></div>
	</div>
	<div class="row"><div class="signoff">The ownership of individual contributions to this community generated content is retained by the authors of their contributions.<br>All trademarks remain the property of the respective owner.</div></div>
</main>


</body>
</html>
