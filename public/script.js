function OpenOverlay(Element) {
  document.getElementById("overlay").style.display = "inline-block";
  document.getElementById(Element).style.display = "inline-block"
}

function CloseOverlay() {
  document.getElementById("overlay").style.display = "none";
  document.getElementById("PalleteBox").style.display = "none";
  document.getElementById("ChangeIcon").style.display = "none";
  document.getElementById("ChangeName").style.display = "none";
}

function NameChange() {
	localStorage.setItem("Name", prompt("Please Enter your new Name"))
	if (!localStorage.getItem("Name")) {
		localStorage.setItem("Name", "John Doe")
	}
	document.getElementById("HomepageName").textContent = localStorage.getItem("Name")
	document.getElementById("Name").textContent = localStorage.getItem("Name")
}

//Colour Changing
function SetColour(Colour) {
	let old = localStorage.getItem("Colour")
	if (!old) {
		old = "standard"
	}
	localStorage.setItem("OldColour", old)
	localStorage.setItem("Colour", Colour)
	ChangeColour()
}

function ChangeColour() {
	let colour = localStorage.getItem("Colour")
	let oldcolour = localStorage.getItem("OldColour")
	if (!colour) {
		colour = "standard"
	}
	if (!oldcolour) {
		oldcolour = "standard"
	}
	let newclass = [colour + "text", colour + "contrast", colour + "dark", colour + "nav", colour + "scrollbar", colour + "main", colour + "light", colour + "hover"]
	let changeclass = ["changetext", "changecontrast", "changedark", "changenav", "changescrollbar", "changemain", "changelight", "changehover"]
	let oldclass = [oldcolour + "text", oldcolour + "contrast", oldcolour + "dark", oldcolour + "nav", oldcolour + "scrollbar", oldcolour + "main", oldcolour + "light", oldcolour + "hover"]

	let x = 0
	while (x != (newclass.length)) {
		const collection = document.getElementsByClassName(changeclass[x]);
		let y = 0
		while (y != collection.length) {
			let element = collection[y]
			element.classList.remove(oldclass[x])
			element.classList.add(newclass[x])
			y++
		}
		x++
	}
	var palletebox = document.getElementById("palletebox")
	if (palletebox) {
		var background = getComputedStyle(palletebox).backgroundColor
		document.body.style.backgroundColor = background
		localStorage.setItem("BackgroundColour", background)
	} else {
		document.body.style.backgroundColor = localStorage.getItem("BackgroundColour")
	}
	CheckLogIn()
}

function CheckLogIn() {
	if (!sessionStorage.getItem("LoggedIn")) {
		sessionStorage.setItem("Redirect", window.location.href)
		window.location.replace("LogIn.html")
	}
}

function LogIn() {
	if (document.getElementById("Email").value && document.getElementById("password").value) {
		if (document.getElementById("Email").value == localStorage.getItem("Email") && document.getElementById("password").value == localStorage.getItem("Password")) {
			sessionStorage.setItem("LoggedIn", "True")
			if (sessionStorage.getItem("Redirect")) {
				window.location.href = sessionStorage.getItem("Redirect")
			} else {
				window.location.href = "index.html"
			}
		} else {
			document.getElementById("alert").textContent = "Incorrect Email / Password"
		}
	} else {
		document.getElementById("alert").textContent = "Please Fill in Both Fields"
	}
}

function LoadSignUp() {
	sessionStorage.setItem("ReCaptcha", "No")
	document.getElementById("my_captcha_form").addEventListener("submit",function(evt)
	  {
	  
	  var response = grecaptcha.getResponse();
	  if(response.length == 0) 
	  { 
	    //reCaptcha not verified
	    evt.preventDefault();
	    return false;
	  }
	  //reCaptch Verified
	  sessionStorage.setItem("ReCaptcha", "Yes")
	  
	});
}

function SignUp() {
	const Alert = document.getElementById("alert")
	if (document.getElementById("Email").value && document.getElementById("Password").value) {
		const Email = document.getElementById("Email").value
		const Password = document.getElementById("Password").value
		if (/\S+@\S+\.\S+/.test(Email)) {
			if (Password.length > 7) {
				if (Password.match(/\d+/g)) {
					if (/[A-Z]/.test(Password)) {
						localStorage.setItem("Email", document.getElementById("Email").value)
						localStorage.setItem("Password", document.getElementById("Password").value)
						Alert.textContent = "Account Created. Redirecting..."
						setTimeout(window.location.href = "LogIn.html", 20000)
					} else {
						Alert.textContent = "Password must contain a Capital Letter"
					}
				} else {
					Alert.textContent = "Password Must Contain a Number"
				}
			} else {
				Alert.textContent = "Password Must be At least 8 Characters"
			}
		} else {
			Alert.textContent = "Please Enter a Valid Email"
		}
	} else {
		Alert.textContent = "Please Fill in Both Fields"
	}
}

function LogOut() {
	sessionStorage.setItem("LoggedIn", "")
	CheckLogIn()
}

function HideLocked() {
	var x = 1
	while (x != (Catagories["SubjectCatagories"] + 1)) {
		var y = 1
		while (y != (Catagories[x]["Amount"] + 1)) {
			var Subject = Catagories[x]["Subjects"][y]
			var Percent = localStorage.getItem("Sacraments" + "Percent")
			if (Percent < 90) {
				document.getElementById("Sacraments").style.opacity = "50%"
			} else {
				document.getElementById("Sacraments").style.opacity = "100%"
			}
			y++
		}
		x++
	}
}

function UnlockColour(subject) {
	var percent = localStorage.getItem(subject + "Percent")
	if (percent >= 90) {
		SetColour(subject)
	}
}

function FreeUnavaliable() {
	alert("Not Avaliable With a Free Account")
}

//Homepage
function LoadHomepageSubjects() {
	HideLocked()
	CloseOverlay()
	document.getElementById("HomepageName").textContent = localStorage.getItem("Name")
	document.getElementById("Name").textContent = localStorage.getItem("Name")
	document.getElementById("Accuracy").textContent = localStorage.getItem('GeneralPercent')? "Accuracy: " + localStorage.getItem("GeneralPercent") + "%" : "No quizzes completed yet!" // Added this here to fix the null accuracy problem. In my quiz I will add to the accuracies. - Jordan
	var n = 1
	var MainParent = document.getElementById("MainParent")
	while (n != 4) {
		try {
			var Sub;
			var subject = localStorage.getItem("subject" + n);
			eval('Sub=' + subject + ';');
			var div = document.createElement("div")
			div.id = "Square" + n
			if (Sub["Functions"] == "true") {
				div.setAttribute("onclick", "TaskSelect('" + subject + "')")
				div.className = "subjectsquare standardcontrast changecontrast"
			} else {
				div.setAttribute("onclick", "FreeUnavaliable()")
				div.className = "subjectsquare standarddark changedark"
			}
			var Image = document.createElement("img")
			Image.src = Sub["Image"]
			Image.classname = "center bottom"
			Image.style = "max-width: 250px"

			var Text = document.createElement("div")
			Text.classname = "center bottom"
			Text.innerHTML = "<h2>" + Sub["Name"] + "</h2>"

			MainParent.appendChild(div)
			var Parent = document.getElementById("Square" + n)
			Parent.appendChild(Image)
			Parent.appendChild(Text)
		}
		catch (err) {
			n = 3
		}
		n++
	}
	ChangeColour()
}

//Tasks
function TaskSelect(Task) {
	const HPsub = [Task, localStorage.getItem("subject1"), localStorage.getItem("subject2"), localStorage.getItem("subject3")]
	if (HPsub[0] == HPsub[2]) {
		SelectAutomate(2, HPsub)
	} else if (HPsub[0] == HPsub[3]) {
		SelectAutomate(3, HPsub)
	} else if (localStorage.getItem("subject1") != Task) {
		SelectAutomate(3, HPsub)
	}
	localStorage.setItem("TopicSubject", Task)
	window.location.href = 'task-topics.html';
}

function SelectAutomate(n, array) {
	var y = 1
	while (y != (n + 1)) {
		localStorage.setItem("subject" + y, array[y - 1])
		y++
	}
}

function LoadTasks() {
	var SubjectCatagories = (Catagories["SubjectCatagories"] + 1)
	var x = 1
	var MainParent = document.getElementById("MainParent")
	while (x != SubjectCatagories) {
		var title = document.createElement("t")
		title.className = "homepagesubtext standardtext changetext"
		title.textContent = Catagories[x]["Title"]
		MainParent.appendChild(title)
		var Linebreak1 = document.createElement("br")
		MainParent.appendChild(Linebreak1)
		var Linebreak2 = document.createElement("br")
		MainParent.appendChild(Linebreak2)
		var Subjects = (Catagories[x]["Amount"] + 1)
		var y = 1
		while (y != Subjects) {
			var Sub;
			var subject = Catagories[x]["Subjects"][y - 1]
			eval('Sub=' + subject + ';');

			var Div = document.createElement("div")
			Div.id = Catagories[x]["Subjects"][y - 1]
			if (Sub["Functions"] == "true") {
				Div.setAttribute("onclick", "TaskSelect('" + subject + "')")
				Div.className = "subjectsquare standardcontrast changecontrast"
			} else {
				Div.setAttribute("onclick", "FreeUnavaliable()")
				Div.className = "subjectsquare standarddark changedark"
			}
			MainParent.appendChild(Div)
			var Parent = document.getElementById(Catagories[x]["Subjects"][y - 1])

			var Image = document.createElement("img")
			Image.src = Sub["Image"]
			Image.classname = "center bottom"
			Image.style = "max-width: 250px"
			Parent.appendChild(Image)

			var Text = document.createElement("div")
			Text.innerHTML = "<br><h2>" + Sub["Name"] + "</h2><br>"
			Text.classname = "center bottom"
			Parent.appendChild(Text)
			y++
		}
		var z = 1
		if (Math.ceil((Subjects - 1) / 4) == 1) {
			z = 0
		}
		while (z != (Math.ceil((Subjects - 1) / 4) * 15)) {
			var Linebreak = document.createElement("br")
			MainParent.appendChild(Linebreak)
			z++
		}
		x++
	}
	ChangeColour()
}

//Info
function InfoSelect(Info) {
	const HPsub = [Info, localStorage.getItem("subject1"), localStorage.getItem("subject2"), localStorage.getItem("subject3"), localStorage.getItem("subject4")]
	if (HPsub[0] == HPsub[2]) {
		SelectAutomate(2, HPsub)
	} else if (HPsub[0] == HPsub[3]) {
		SelectAutomate(3, HPsub)
	} else if (localStorage.getItem("subject1") != Info) {
		SelectAutomate(4, HPsub)
	}
	localStorage.setItem("TopicSubject", Info)
	window.location.href = 'info-topics.html';
}

function LoadInfo() {
	var SubjectCatagories = (Catagories["SubjectCatagories"] + 1)
	var x = 1
	var MainParent = document.getElementById("MainParent")
	while (x != SubjectCatagories) {
		var title = document.createElement("t")
		title.className = "homepagesubtext standardtext changetext"
		title.textContent = Catagories[x]["Title"]
		MainParent.appendChild(title)
		var Linebreak1 = document.createElement("br")
		MainParent.appendChild(Linebreak1)
		var Linebreak2 = document.createElement("br")
		MainParent.appendChild(Linebreak2)
		var Subjects = (Catagories[x]["Amount"] + 1)
		var y = 1
		while (y != Subjects) {
			var Sub;
			var subject = Catagories[x]["Subjects"][y - 1]
			eval('Sub=' + subject + ';');
		
			var Div = document.createElement("div")
			Div.id = Catagories[x]["Subjects"][y - 1]
			if (Sub["Functions"] == "true") {
				Div.setAttribute("onclick", "InfoSelect('" + subject + "')")
				Div.className = "subjectsquare standardcontrast changecontrast"
			} else {
				Div.setAttribute("onclick", "FreeUnavaliable()")
				Div.className = "subjectsquare standarddark changedark"
			}
			MainParent.appendChild(Div)
			var Parent = document.getElementById(Catagories[x]["Subjects"][y - 1])

			var Image = document.createElement("img")
			Image.src = Sub["Image"]
			Image.classname = "center bottom"
			Image.style = "max-width: 250px"
			Parent.appendChild(Image)

			var Text = document.createElement("div")
			Text.innerHTML = "<br><h2>" + Sub["Name"] + "</h2><br>"
			Text.classname = "center bottom"
			Parent.appendChild(Text)
			y++
		}
		var z = 1
		while (z != (Math.ceil((Subjects - 1) / 4) * 15)) {
			var Linebreak = document.createElement("br")
			MainParent.appendChild(Linebreak)
			z++
		}
		x++
	}
	ChangeColour()
}

//Task-Topics
function LoadTasksTopics() {
	var Sub;
	var subject = localStorage.getItem("TopicSubject");
	eval('Sub=' + subject + ';');
	console.log(Sub, subject)
	document.title = "Tasks - " + subject
	document.getElementById("PleaseSelect").style.display = "block";
	document.getElementById("TheInfo").style.display = "none";
	document.getElementById("SubjectName").textContent = Sub["Name"];
	document.getElementById("SubjectImage").src = Sub["Image"];
	const TotalTopicN = Sub["Ntopic"] + 1
	console.log(TotalTopicN, Sub["Ntopic"])
	var n = 1
	const mainparent = document.getElementById("TopicScrollbar")
	while (n != TotalTopicN) {
		var div = document.createElement("div")
		div.id = "Topic" + n
		div.setAttribute("onclick", "ResetTopic('" + subject + "', '" + n + "', 'Task')")
		div.className = "tasks-topic standardcontrast changecontrast"
		mainparent.appendChild(div)
		const parent = document.getElementById("Topic" + n)

		var text = document.createElement("h2")
		text.textContent = Sub["Topics"][n]["Title"]
		parent.appendChild(text)
		n++
	}
	ChangeColour()
}

//Info-Topics
function LoadInfoTopics() {
	var Sub;
	var subject = localStorage.getItem("TopicSubject");
	eval('Sub=' + subject + ';');
	document.title = "Info - " + subject
	document.getElementById("PleaseSelect").style.display = "block";
	document.getElementById("TheInfo").style.display = "none";
	document.getElementById("SubjectName").textContent = Sub["Name"];
	document.getElementById("SubjectImage").src = Sub["Image"];
	const TotalTopicN = (Sub["Ntopic"] + 1)
	var n = 1
	const mainparent = document.getElementById("TopicScrollbar")
	while (n != TotalTopicN) {
		var div = document.createElement("div")
		div.id = "Topic" + n
		div.setAttribute("onclick", "ResetTopic('" + subject + "', '" + n + "', 'Info')")
		div.className = "tasks-topic standardcontrast changecontrast"
		mainparent.appendChild(div)
		const parent = document.getElementById("Topic" + n)

		var text = document.createElement("h2")
		text.textContent = Sub["Topics"][n]["Title"]
		parent.appendChild(text)
		n++
	}
	ChangeColour()
}

//Topics
function ResetTopic(Database, TopicN, TorI) {
	document.getElementById("PleaseSelect").style.display = "none";
	document.getElementById("TheInfo").style.display = "block";
	var colour = localStorage.getItem("Colour")
	var sub;
	var subject = Database;
	eval('sub=' + subject + ";");
	var Repeats = 1
	var RepeatMax = sub['Ntopic'] + 1
	while (Repeats != RepeatMax) {
		document.getElementById("Topic" + Repeats).classList.remove('activetask');
		if (colour == "standard") {
			document.getElementById("Topic" + Repeats).style.backgroundColor = "#f9cb9c"
		} else if (colour == "cool") {
			document.getElementById("Topic" + Repeats).style.backgroundColor = "#008080"
		} else if (colour == "warm") {
			document.getElementById("Topic" + Repeats).style.backgroundColor = "#dc143c"
		} else if (colour == "neutral") {
			document.getElementById("Topic" + Repeats).style.backgroundColor = "#b09171ff"
		}
		Repeats++
	}
	document.getElementById("Topic" + TopicN).classList.add('activetask');
	if (colour == "standard") {
		document.getElementById("Topic" + TopicN).style.backgroundColor = "#a2c4c9"
	} else if (colour == "cool") {
		document.getElementById("Topic" + TopicN).style.backgroundColor = "#3fad00ff"
	} else if (colour == "warm") {
		document.getElementById("Topic" + TopicN).style.backgroundColor = "#ff5555ff"
	} else if (colour == "neutral") {
		document.getElementById("Topic" + TopicN).style.backgroundColor = "#7b7b7bff"
	}
	document.getElementById("TaskImage").src = sub["Topics"][TopicN]["Image"];
	const subtopic = sub["Topics"][TopicN]["Title"].replace(/\s/g, "");
	const maintopic = subject;
	const topicId = maintopic + subtopic;
	const quizButton = document.getElementById("quiz-button")
	quizButton ? quizButton.href = `../src/quiz-jordan/index.html?quizId=${topicId}` : null
	if (TorI == "Task") {
		document.getElementById("TaskText").innerHTML = sub["Topics"][TopicN]["TaskText"];
	} else {
		var info = sub["Topics"][TopicN]["InfoText"]
		if (info == undefined) {
			info = sub["Topics"][TopicN]["TaskText"]
		}
		document.getElementById("TaskText").innerHTML = info
	}
	localStorage.setItem("QuizDatabase", Database)
	localStorage.setItem("QuizTopic", TopicN)
	UpdateRecord(TorI, Database, sub["Topics"][TopicN]["Title"])
}

//Quiz
function LoadQuiz() {
	var Database = localStorage.getItem("QuizDatabase");
	var TopicN = localStorage.getItem("QuizTopic");
	var sub;
	var subject = Database;
	eval('sub=' + subject + ";");
	document.getElementById("Title").textContent = sub["Topics"][TopicN]["Quiz"]["1"]["Question"]
	document.getElementById("Image").src = sub["Topics"][TopicN]["Quiz"]["1"]["Image"]
	localStorage.setItem("CurrentQ", 0)
	localStorage.setItem("Score", 0)
	localStorage.setItem("Answer", 0)
	QuizQuestion()
	ChangeColour()
}

function SelectQuiz(Select, Quiz) {
	if (Quiz == "4-Answer") {
		document.getElementById("A").classList.remove('quiz-active');
		document.getElementById("B").classList.remove('quiz-active');
		document.getElementById("C").classList.remove('quiz-active');
		document.getElementById("D").classList.remove('quiz-active');
		document.getElementById(Select).classList.add('quiz-active');
		localStorage.setItem("Answer", Select)
	} else if (Quiz == "TrueFalse") {
		document.getElementById("True").classList.remove('quiz-active');
		document.getElementById("False").classList.remove('quiz-active');
		document.getElementById(Select).classList.add('quiz-active');
		localStorage.setItem("Answer", Select)
	} else if (Quiz == "Checkmark") {
		let checkbox = document.getElementById("Check" + Select + "box")
		let mainbutton = document.getElementById("Check" + Select)
		if (checkbox.checked == true) {
			checkbox.checked = false
			mainbutton.classList.remove('quiz-active');
			localStorage.setItem(Select, "Off")
		} else if (checkbox.checked == false) {
			checkbox.checked = true
			mainbutton.classList.add('quiz-active');
			localStorage.setItem(Select, "On")
		}
	}
}

function Submit() {
	var Database = localStorage.getItem("QuizDatabase");
	var TopicN = localStorage.getItem("QuizTopic");
	var sub;
	var CurrentQ = localStorage.getItem("CurrentQ")
	var subject = Database;
	eval('sub=' + subject + ";");
	var Qtype = sub["Topics"][TopicN]["Quiz"][CurrentQ]["QuestionType"]
	var CorrectAnswer = sub["Topics"][TopicN]["Quiz"][CurrentQ]["Answer"]
	var SelectedAnswer = localStorage.getItem("Answer")
	var currentscore = localStorage.getItem("Score")
	if (Qtype == "4-Answer") {
		document.getElementById("A").classList.remove('quiz-active');
		document.getElementById("B").classList.remove('quiz-active');
		document.getElementById("C").classList.remove('quiz-active');
		document.getElementById("D").classList.remove('quiz-active');

	} else if (Qtype == "TrueFalse") {
		document.getElementById("True").classList.remove("quiz-active");
		document.getElementById("False").classList.remove("quiz-active");
	} else if (Qtype == "Checkmark") {
		const GuessedAnswers = [localStorage.getItem("A"), localStorage.getItem("B"), localStorage.getItem("C"), localStorage.getItem("D")]
		const CorrectAnswers = sub["Topics"][TopicN]["Quiz"][CurrentQ]["Answers"]
		let x = 0
		let shortscore = 0
		while (x != 4) {
			if (GuessedAnswers[x] == CorrectAnswers[x]) {
				shortscore++
			}
			x++
		}
		var finalscore = shortscore / 4
	}
	if (SelectedAnswer == CorrectAnswer) {
		var newscore = parseFloat(currentscore) + 1
	} else if (Qtype == "Checkmark") {
		var newscore = parseFloat(currentscore) + finalscore
	} else {
		var newscore = currentscore
	}
	localStorage.setItem("Score", newscore)
	localStorage.setItem("CurrentQ", String(parseInt(localStorage.getItem("CurrentQ"))))
	QuizQuestion()
}

function QuizQuestion() {
	var Sub;
	var subject = localStorage.getItem("QuizDatabase");
	eval('Sub=' + subject + ";");
	var CurrentQ = String(localStorage.getItem("CurrentQ"))
	var CurrentT = String(localStorage.getItem("QuizTopic"))
	var NewQ = String(parseInt(CurrentQ) + 1)
	localStorage.setItem("CurrentQ", NewQ)
	var QuestionType = Sub["Topics"][CurrentT]["Quiz"][NewQ]["QuestionType"]
	document.getElementById("Quiz").style.display = "block"
	document.getElementById("End Screen").style.display = "none"
	if (QuestionType == "4-Answer") {
		HideQuiz("4-Answer")
		document.getElementById("Atext").textContent = Sub["Topics"][CurrentT]["Quiz"][NewQ]["PossibleAnswers"][0]
		document.getElementById("Btext").textContent = Sub["Topics"][CurrentT]["Quiz"][NewQ]["PossibleAnswers"][1]
		document.getElementById("Ctext").textContent = Sub["Topics"][CurrentT]["Quiz"][NewQ]["PossibleAnswers"][2]
		document.getElementById("Dtext").textContent = Sub["Topics"][CurrentT]["Quiz"][NewQ]["PossibleAnswers"][3]
	} else if (QuestionType == "TrueFalse") {
		HideQuiz("TrueFalse")
	} else if (QuestionType == "Checkmark") {
		HideQuiz("Checkmark")
		document.getElementById("CheckAtext").textContent = Sub["Topics"][CurrentT]["Quiz"][NewQ]["PossibleAnswers"][0]
		document.getElementById("CheckBtext").textContent = Sub["Topics"][CurrentT]["Quiz"][NewQ]["PossibleAnswers"][1]
		document.getElementById("CheckCtext").textContent = Sub["Topics"][CurrentT]["Quiz"][NewQ]["PossibleAnswers"][2]
		document.getElementById("CheckDtext").textContent = Sub["Topics"][CurrentT]["Quiz"][NewQ]["PossibleAnswers"][3]
		localStorage.setItem("A", "Off")
		localStorage.setItem("B", "Off")
		localStorage.setItem("C", "Off")
		localStorage.setItem("D", "Off")
	} else if (QuestionType == "End") {
		document.getElementById("Quiz").style.display = "none"
		document.getElementById("End Screen").style.display = "block"
		var score = localStorage.getItem("Score")
		var scorepercent = score * 10
		UpdateScores(parseFloat(score), subject, CurrentT)
		if (score == 10) {
			document.getElementById("FinalTitle").textContent = "Perfect"
		} else if ((score < 10) && (score > 6)) {
			document.getElementById("FinalTitle").textContent = "Congrats!"
		} else if ((score < 7) && (score > 3)) {
			document.getElementById("FinalTitle").textContent = "Well Done"
		} else if ((score < 4) && (score > 0)) {
			document.getElementById("FinalTitle").textContent = "Try Again"
		} else if (score == 0) {
			document.getElementById("FinalTitle").textContent = "Were You Even Trying?"
		}
		if (localStorage.getItem(CurrentT + "Percent") == "") {
			prompt("HEEEEEEEEEEEEElp")
		}
		document.getElementById("FinalText").innerHTML = "You have Achieved a " + scorepercent + "% on the Baptism Topic of Sacraments in Religion <br><br> This is Better than Your " + localStorage.getItem(subject + CurrentT + "Percent") + "% average of Baptism, <br><br> Your Average of " + localStorage.getItem(subject + "Percent") + "% in Sacraments, <br><br> Your " + localStorage.getItem(Sub["MainSubject"] + "Percent") + "% Average of Religion, <br><br> And your General " + localStorage.getItem("GeneralPercent") + "% Average."
	}
	document.getElementById("Title").textContent = Sub["Topics"][CurrentT]["Quiz"][NewQ]["Question"]
	document.getElementById("Image").src = Sub["Topics"][CurrentT]["Quiz"][NewQ]["Image"]
}

function UpdateScores(Score, Subject, Topic) {
	var Sub;
	eval('Sub=' + Subject + ";");
	var MainSubject = Sub["MainSubject"]

	var topicscore = (parseFloat(localStorage.getItem(Subject + Topic + "Score")) / 10)
	if (!topicscore) {
		var topicscore = Score
	} else {
		topicscore += Score
	}
	var subjectscore = (parseFloat(localStorage.getItem(Subject + "Score")) / 10)
	if (!subjectscore) {
		var subjectscore = Score
	} else {
		subjectscore += Score
	}
	var generalscore = (parseFloat(localStorage.getItem("GeneralScore")) / 10)
	if (!generalscore) {
		var generalscore = Score
	} else {
		generalscore += Score
	}
	var mainsubjectscore = (parseFloat(localStorage.getItem(MainSubject + "Score")) / 10)
	if (!mainsubjectscore) {
		var mainsubjectscore = Score
	} else {
		mainsubjectscore += Score
	}

	var topictries = parseFloat(localStorage.getItem(Subject + Topic + "Tries"))
	if (!topictries) {
		var topictries = 1
	} else {
		topictries += 1
	}
	var subjecttries = parseFloat(localStorage.getItem(Subject + "Tries"))
	if (!subjecttries) {
		var subjecttries = 1
	} else {
		subjecttries += 1
	}
	var generaltries = parseFloat(localStorage.getItem("GeneralTries"))
	if (!generaltries) {
		var generaltries = 1
	} else {
		generaltries += 1
	}
	var mainsubjecttries = parseFloat(localStorage.getItem(MainSubject + "Tries"))
	if (!mainsubjecttries) {
		var mainsubjecttries = 1
	} else {
		mainsubjecttries += 1
	}

	var topicpercent = parseFloat(topicscore / topictries) * 10
	var subjectpercent = parseFloat(subjectscore / subjecttries) * 10
	var generalpercent = parseFloat(generalscore / generaltries) * 10
	var mainsubjectpercent = parseFloat(mainsubjectscore / mainsubjecttries) * 10

	localStorage.setItem(Subject + Topic + "Score", (topicscore * 10))
	localStorage.setItem(Subject + "Score", (subjectscore * 10))
	localStorage.setItem("GeneralScore", (generalscore * 10))
	localStorage.setItem(MainSubject + "Score", (mainsubjectscore * 10))

	localStorage.setItem(Subject + Topic + "Tries", (topictries))
	localStorage.setItem(Subject + "Tries", (subjecttries))
	localStorage.setItem("GeneralTries", (generaltries))
	localStorage.setItem(MainSubject + "Tries", (mainsubjecttries))

	localStorage.setItem(Subject + Topic + "Percent", (topicpercent))
	localStorage.setItem(Subject + "Percent", (subjectpercent))
	localStorage.setItem("GeneralPercent", (generalpercent))
	localStorage.setItem(MainSubject + "Percent", (mainsubjectpercent))
}

function HideQuiz(Quiz) {
	const Elements = ["A", "B", "C", "D", "True", "False", "CheckA", "CheckB", "CheckC", "CheckD"]
	var n = 0
	while (n != 10) {
		document.getElementById(Elements[n]).style.display = "none"
		n++
	}
	var N = 0;
	var maxN = 4
	if (Quiz == "4-Answer") {
		N = 0
		maxN = 4
	} else if (Quiz == "TrueFalse") {
		N = 4
		maxN = 6
	} else if (Quiz == "Checkmark") {
		N = 6
		maxN = 10
	}
	while (N != maxN) {
		document.getElementById(Elements[N]).style.display = "block";
		N++
	}
}

//Record
function UpdateRecord(Type, Subject, Topic) {
	const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
	const date = new Date();
	var datetime = date.getDate() + " / " + (date.getMonth() + 1)
	const recordType = [Type];
	const recordSubject = [Subject];
	const recordTopic = [Topic];
	const recordDate = [datetime]
	for (const n of numbers) {
		recordType[n] = localStorage.getItem("RecordType" + n);
		recordSubject[n] = localStorage.getItem("RecordSubject" + n);
		recordTopic[n] = localStorage.getItem("RecordTopic" + n);
		recordDate[n] = localStorage.getItem("RecordDate" + n);
	}
	for (const n of numbers) {
		localStorage.setItem("RecordType" + n, recordType[n - 1]);
		localStorage.setItem("RecordSubject" + n, recordSubject[n - 1]);
		localStorage.setItem("RecordTopic" + n, recordTopic[n - 1]);
		localStorage.setItem("RecordDate" + n, recordDate[n - 1]);
	}
}

function LoadRecordDiv() {
	var parent = document.getElementById("Non-empty");
	var n = 1
	while (n != 11) {
		const mainDiv = document.createElement("div");
		mainDiv.className = "record-value standardcontrast changecontrast"
		mainDiv.id = "entry" + n
		parent.appendChild(mainDiv)
		BuildRecordText(n, "Type")
		BuildRecordDivider(n)
		BuildRecordText(n, "Subject")
		BuildRecordDivider(n)
		BuildRecordText(n, "Topic")
		BuildRecordDivider(n)
		BuildRecordText(n, "Date")
		if ((document.getElementById("Type" + n + "text").textContent) == "null") {
			document.getElementById("entry" + n).style.display = "none";
			n = 10
		}
		n++
	}
	ChangeColour()
}

function BuildRecordText(n, cat) {
	var parent = document.getElementById("entry" + n)
	var div = document.createElement("div")
	div.className = "record-inside RI-text"
	div.id = cat + n
	div.innerHTML = ("<h5 id=" + (cat + n + "text") + ">" + localStorage.getItem("Record" + cat + n) + "</h5>")
	parent.appendChild(div)
}

function BuildRecordDivider(n) {
	var parent = document.getElementById("entry" + n)
	var divider = document.createElement("div")
	divider.className = "record-inside RI-divider"
	divider.innerHTML = ("<h5>|</h5>")
	parent.appendChild(divider)
}

//Databases
const Catagories = {
	"SubjectCatagories": 3,
	1: {
		"Title": "History",
		"Amount": 6,
		"Subjects": ["AncientChina", "AncientEgypt", "AncientJapan", "TheBlackDeath", "TheBritishEmpire", "TheRomanEmpire"]
	},
	2: {
		"Title": "Science",
		"Amount": 1,
		"Subjects": ["Chemistry"]
	},
	3: {
		"Title": "Religion",
		"Amount": 1,
		"Subjects": ["Sacraments"]
	}
}

const TheBlackDeath = {
	"Name": "The Black Death",
	"Functions": "true",
	"Ntopic": 5,
	"Image": "Images/The Black Death.png",
	"Topics": {
		"1": {
			"Title": "Introduction",
			"Image": "https://www.usu.edu/markdamen/1320hist&civ/slides/06plague/burial.jpg",
			"TaskText": "The Black Death, a catastrophic bubonic plague pandemic that swept through Europe from 1346 to 1353, remains one of history’s deadliest outbreaks. With an estimated death toll of 50 million people—possibly half of Europe’s 14th-century population—the disease caused widespread devastation. Yersinia pestis, transmitted by fleas and through the air, triggered this unprecedented catastrophe.",
			"InfoText" : "Plague doctors, physicians contracted by a government to tend to patients infected with plague during an epidemic, especially the plagues in Europe in the Middle Ages. Plague doctors were contracted by a city or town during an outbreak to treat plague patients specifically. The contract would outline the plague doctor’s responsibilities, boundaries, and pay and would often include the obligation to visit neighbourhoods hit hardest by plague and to treat even the poorest of patients who could not otherwise pay."

		},
		"2": {
			"Title": "Responses",
			"Image": "https://cdn.thecollector.com/wp-content/uploads/2021/12/pope-clement-vi-medieval-period.jpg?width=1200&quality=55",
			"TaskText": "In response to the Black Death, authorities implemented improved sanitation and public health measures. Sanitary systems, clean water supplies, and proper waste disposal helped limit the spread. Protective clothing, quarantine, and social distancing reduced transmission. Innovations in medicine emerged, including rudimentary hospitals and herbal remedies.",
			"InfoText": "In response to the Black Death, authorities implemented improved sanitation and public health measures. Sanitary systems, clean water supplies, and proper waste disposal helped limit the spread. Protective clothing, quarantine, and social distancing reduced transmission. Innovations in medicine emerged, including rudimentary hospitals and herbal remedies."

		},
		"3": {
			"Title": "Modern Healthcare Influence",
			"Image": "https://th.bing.com/th/id/OIP.duPDGFE4umYuPYCOPPcGsAHaE7?rs=1&pid=ImgDetMain",
			"TaskText": "The Black Death’s impact is still felt in today’s public health strategies. The pandemic's severity underscored the importance of quarantine and isolation, practices that are crucial in managing modern outbreaks like COVID-19. Lessons from the Black Death have also influenced the development of global health systems and protocols, emphasizing rapid response and surveillance. In our interconnected world, these historical insights help guide contemporary efforts to prevent and control pandemics, showing how past crises continue to shape current health practices and policies.",
			"InfoText": "The Black Death’s impact is still felt in today’s public health strategies. The pandemic's severity underscored the importance of quarantine and isolation, practices that are crucial in managing modern outbreaks like COVID-19. Lessons from the Black Death have also influenced the development of global health systems and protocols, emphasizing rapid response and surveillance. In our interconnected world, these historical insights help guide contemporary efforts to prevent and control pandemics, showing how past crises continue to shape current health practices and policies."

		},
		"4": {
			"Title": "Artistic Influence",
			"Image": "https://www.science.org/do/10.1126/science.abc7832/abs/ca_0515_Inequality_leadblackdeath_1280x720.jpg",
			"TaskText": "The Black Death not only devastated populations but also deeply influenced art and literature of the time. Medieval artists began depicting scenes of death and suffering, with an intense focus on the fragility of human life. Paintings like 'The Triumph of Death' captured the macabre atmosphere. Literature shifted toward themes of morality and salvation, heavily influenced by the pervasive fear of death. The artistic and literary responses to the Black Death reflect the existential crises that shaped the cultural and spiritual landscapes of the Middle Ages.",
			"InfoText": "The Black Death not only devastated populations but also deeply influenced art and literature of the time. Medieval artists began depicting scenes of death and suffering, with an intense focus on the fragility of human life. Paintings like 'The Triumph of Death' captured the macabre atmosphere. Literature shifted toward themes of morality and salvation, heavily influenced by the pervasive fear of death. The artistic and literary responses to the Black Death reflect the existential crises that shaped the cultural and spiritual landscapes of the Middle Ages."
		},
		"5": {
			"Title": "Population and Labour Decline",
			"Image": "https://gdb.rferl.org/78A14CC4-C8FB-4524-9C4D-C7B6616FBF05_cx0_cy2_cw0_w1200_r1_s.jpg",
			"TaskText": "The Black Death significantly reduced Europe's population, leading to widespread labor shortages and shifting economic dynamics. As you explore this section, consider how these changes affected peasants and laborers, the rise of new economic opportunities, and the decline of feudal structures. Answer the following questions to understand the lasting impact of the Black Death on population and labor conditions across Europe.",
			"InfoText": "The Black Death significantly reduced Europe's population, leading to widespread labor shortages and shifting economic dynamics. As you explore this section, consider how these changes affected peasants and laborers, the rise of new economic opportunities, and the decline of feudal structures. Answer the following questions to understand the lasting impact of the Black Death on population and labor conditions across Europe."

		}

	}
};

const TheRomanEmpire = {
	"Name": "The Roman Empire",
	"Image": "Images/Roman Colosseum.png",
	"Functions": "false",
}

const AncientEgypt = {
	"Name": "Ancient Egypt",
	"Image": "Images/Great Pyramids.png",
	"Functions": "false",
}

const AncientJapan = {
	"Name": "Ancient Japan",
	"Image": "Images/Torii Gate.png",
	"Functions": "false",
}

const AncientChina = {
	"Name": "Ancient China",
	"Image": "Images/Chinese Dragon.png",
	"Functions": "false",
}

const TheBritishEmpire = {
	"Name": "The British Empire",
	"Image": "Images/Crown.png",
	"Functions": "false",
}

const Chemistry = {
	"Name": "Chemistry",
	"Image": "Images/Chemistry.png",
	"Functions": "false",
	"Ntopic": 1,
	"Topics": {
		"1": {
			"Title": "Compounds",
			"Image": "Images/Chemistry/Compound Prefix Table.png",
			"TaskText": "A compound is a chemical fusion of two or more elements. This is commonly between a non-metal and another element. When done this way there are certain materials that come first. If there is a metal then the metal comes first, if there is no metal then go by atomic number, the lower the number first. When calculating the amount of an element in word equations we use the above table. We can see that with this table, CO2 has one carbon atom and 2 oxygen atoms, and so we see that the word formula is Carbon <strong>Di</strong>oxide. We also swap out the end of the second word with -ide, so NaCl would be Sodium Chlor<strong>ide</strong>, As Sodium (Na, Element 11) has a lesser atomic number than Chloride (Cl, Element 17), so Sodium goes first and we swap out the end of Chloride."
		}
	}
}

const Sacraments = {
	"Name": "Sacraments",
	"Image": "Images/Sacraments.png",
	"Functions": "false",
	"MainSubject": "Religion",
	"Ntopic": 2,
	"Topics": {
		"1": {
			"Title": "Baptism",
			"Image": "Images/Sacraments/Baptism/Main Image.png",
			"TaskText": "In Baptism God our Father welcomes us into the church community. It is the first Sacrament of Initiation. In Baptism we become children of God and shave in the new life of Jesus and we celebrate the presence of the Holy Spirit. The Priest starts by pouring water over the head of the baby/adult, before saying \"I Baptise you in the name of the Father, and the son, and the holy spirit\" and giving the child their name before making the sign of the cross on the recipients head in holy oil. A candle is then given to the god-parents and everyone prays together with the baby being placed in a white garment",
			"InfoText": "In Baptism God our Father welcomes us into the church community. It is the first Sacrament of Initiation. In Baptism we become children of God and shave in the new life of Jesus and we celebrate the presence of the Holy Spirit. The Priest starts by pouring water over the head of the baby/adult, before saying \"I Baptise you in the name of the Father, and the son, and the holy spirit\" and giving the child their name before making the sign of the cross on the recipients head in holy oil. A candle is then given to the god-parents and everyone prays together with the baby being placed in a white garment. <br><br> Each step of Baptism holds large amounts of symbolism and reasoning. The Water used to begin the Ceremony symbolises the Cleansing of the soul from original sin. The Holy Oil of Catechumens is used to make the sign of the cross on the baby/adults forehead. This oil is used specifically because it helps strengthen the person's resilience against the devil and sin. The Candle given to the godparents shows Jesus Christ, the Light of the World. Not only Priests Can baptise people, as anyone is able to baptise a person if their life is endangered and a priest is unavailable. The Sacrament of Baptism has occured many times, one of the most famous Baptists was St Jhon the Baptist who baptised people in the jordan river during Jesus' time. One of the Most famous Prayers, the Apostles Creed is Said at all Sacraments, Baptism not excluded.",
			"Quiz": {
				"1": {
					"QuestionType": "4-Answer",
					"Question": "Which Sacrament of Initiation is Baptism?",
					"Image": "Images/Sacraments/Baptism/Initiation.png",
					"PossibleAnswers": ["The First", "The Second", "The Third", "The Fourth"],
					"Answer": "A",
				},
				"2": {
					"QuestionType": "Checkmark",
					"Question": "What Symbolic Items are used in Baptism?",
					"Image": "Images/Sacraments/Baptism/Symbolic Item.jpg",
					"PossibleAnswers": ["A Candle", "A White Cloth", "A Chalice", "A Bible"],
					"Answer": ["On", "On", "Off", "Off"]
				},
				"3": {
					"QuestionType": "4-Answer",
					"Question": "What Holy oil is used in Baptism?",
					"Image": "Images/Sacraments/Baptism/Holy Oil.jpg",
					"PossibleAnswers": ["Holy Oil", "Oil of Catechumens", "Oil of Chrism", "Vegetable Oil"],
					"Answer": "B",
				},
				"4": {
					"QuestionType": "TrueFalse",
					"Image": "Images/Sacraments/Baptism/Church Interior.jpg",
					"Question": "Because Baptisms are usually done in the Dark, the Candle is used to light the room",
					"Answer": "False"
				},
				"5": {
					"QuestionType": "4-Answer",
					"Question": "The oil used in Baptism helps Strengthen the Recipient. What does it help them become Resilient Against?",
					"Image": "Images/Sacraments/Baptism/Oil Blessing.jpg",
					"PossibleAnswers": ["Garlic", "People", "Cats", "The Devil"],
					"Answer": "D",
				},
				"6": {
					"QuestionType": "4-Answer",
					"Question": "What Does the Candle Given to the Godparents Represent",
					"Image": "Images/Sacraments/Baptism/Baptism Candle.jpg",
					"PossibleAnswers": ["Jesus Christ", "Purity of the Soul", "Love", "Fire"],
					"Answer": "A",
				},
				"7": {
					"QuestionType": "TrueFalse",
					"Image": "Images/Sacraments/Baptism/Preist Baptising.jpeg",
					"Question": "Only Priests Can Baptise People",
					"Answer": "False",
				},
				"8": {
					"QuestionType": "4-Answer",
					"Question": "What Colour Garment is Given to the Child",
					"Image": "Images/Sacraments/Baptism/Adult Baptism.jpg",
					"PossibleAnswers": ["Black", "Red", "White", "Green"],
					"Answer": "C",
				},
				"9": {
					"QuestionType": "4-Answer",
					"Question": "What Saint Baptised people in the Jordan River",
					"Image": "Images/Sacraments/Baptism/Jordan River.jpg",
					"PossibleAnswers": ["St Vincent De Paul", "St Francis of Assisi", "St John", "St Maximilian Kolbe"],
					"Answer": "C",
				},
				"10": {
					"QuestionType": "TrueFalse",
					"Image": "Images/Sacraments/Baptism/Apostles Creed.jpg",
					"Question": "The Apostles Creed is told at all Baptisms",
					"Answer": "True",
				},
				"11": {
					"QuestionType": "End"
				}
			}
		},
		"2": {
			"Title": "Eucharist",
			"Image": "Images/Sacraments/Baptism/Main Image.png",
			"TaskText": "The sacrament of the Eucharist is ther Sacrament where we recive bread and wine that have been transformed by the preist into the body and the blood of our saviour Jesus Christ. This typically occurs by the priest or officiant running the mass saying the words of Consecration. You are not supposed to have eaten an hour before the eucharist, however it is late in the mass so commonly you have been in mass almost an hour already.",
			"InfoText": ".",
			"Quiz": {
				"1": {
					"QuestionType": "4-Answer",
					"Question": "Which Sacrament of Initiation is Baptism?",
					"Image": "Images/Sacraments/Baptism/Initiation.png",
					"PossibleAnswers": ["The First", "The Second", "The Third", "The Fourth"],
					"Answer": "A",
				},
				"2": {
					"QuestionType": "Checkmark",
					"Question": "What Symbolic Items are used in Baptism?",
					"Image": "Images/Sacraments/Baptism/Symbolic Item.jpg",
					"PossibleAnswers": ["A Candle", "A White Cloth", "A Chalice", "A Bible"],
					"Answer": ["On", "On", "Off", "Off"]
				},
				"3": {
					"QuestionType": "4-Answer",
					"Question": "What Holy oil is used in Baptism?",
					"Image": "Images/Sacraments/Baptism/Holy Oil.jpg",
					"PossibleAnswers": ["Holy Oil", "Oil of Catechumens", "Oil of Chrism", "Vegetable Oil"],
					"Answer": "B",
				},
				"4": {
					"QuestionType": "TrueFalse",
					"Image": "Images/Sacraments/Baptism/Church Interior.jpg",
					"Question": "Because Baptisms are usually done in the Dark, the Candle is used to light the room",
					"Answer": "False"
				},
				"5": {
					"QuestionType": "4-Answer",
					"Question": "The oil used in Baptism helps Strengthen the Recipient. What does it help them become Resilient Against?",
					"Image": "Images/Sacraments/Baptism/Oil Blessing.jpg",
					"PossibleAnswers": ["Garlic", "People", "Cats", "The Devil"],
					"Answer": "D",
				},
				"6": {
					"QuestionType": "4-Answer",
					"Question": "What Does the Candle Given to the Godparents Represent",
					"Image": "Images/Sacraments/Baptism/Baptism Candle.jpg",
					"PossibleAnswers": ["Jesus Christ", "Purity of the Soul", "Love", "Fire"],
					"Answer": "A",
				},
				"7": {
					"QuestionType": "TrueFalse",
					"Image": "Images/Sacraments/Baptism/Preist Baptising.jpeg",
					"Question": "Only Priests Can Baptise People",
					"Answer": "False",
				},
				"8": {
					"QuestionType": "4-Answer",
					"Question": "What Colour Garment is Given to the Child",
					"Image": "Images/Sacraments/Baptism/Adult Baptism.jpg",
					"PossibleAnswers": ["Black", "Red", "White", "Green"],
					"Answer": "C",
				},
				"9": {
					"QuestionType": "4-Answer",
					"Question": "What Saint Baptised people in the Jordan River",
					"Image": "Images/Sacraments/Baptism/Jordan River.jpg",
					"PossibleAnswers": ["St Vincent De Paul", "St Francis of Assisi", "St John", "St Maximilian Kolbe"],
					"Answer": "C",
				},
				"10": {
					"QuestionType": "TrueFalse",
					"Image": "Images/Sacraments/Baptism/Apostles Creed.jpg",
					"Question": "The Apostles Creed is told at all Baptisms",
					"Answer": "True",
				},
				"11": {
					"QuestionType": "End"
				}
			}
		}
	}
}
