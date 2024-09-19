
//TEST
function HELP() {
	alert("ALERT")
}

//Sidebar
function OpenSidebarPartial() {
	document.getElementById("SidebarPartial").style.display = "block";
}

function CloseSidebarPartial() {
	document.getElementById("SidebarPartial").style.display = "none";
}

function OpenSidebarFull() {
	document.getElementById("SidebarFull").style.display = "block";
}

function CloseSidebarFull() {
	document.getElementById("SidebarFull").style.display = "none";
}

function NameChange() {
	localStorage.setItem("Name", prompt("Please Enter your new Name"))
	document.getElementById("Name").textContent = localStorage.getItem("Name")
	document.getElementById("HomepageName").textContent = localStorage.getItem("Name")
}

//Homepage
function LoadHomepageSubjects() {
	document.getElementById("Name").textContent = localStorage.getItem("Name")
	document.getElementById("HomepageName").textContent = localStorage.getItem("Name")
	var n = 1
	var MainParent = document.getElementById("MainParent")
	while (n != 5) {
		var Sub;
		var subject = localStorage.getItem("subject" + n);
		eval('Sub=' + subject + ';');
		var div = document.createElement("div")
		div.className = "subjectsquare"
		div.id = "Square" + n
		div.setAttribute("onclick", "TaskSelect('" + subject + "')")
		MainParent.appendChild(div)
		var Parent = document.getElementById("Square" + n)

		var Image = document.createElement("img")
		Image.src = "../" + Sub["Image"]
		Image.classname = "center bottom"
		Image.style = "max-width: 250px"
		Parent.appendChild(Image)

		var Text = document.createElement("div")
		Text.classname = "center bottom"
		Text.innerHTML = "<h2>" + Sub["Name"] + "</h2>"
		Parent.appendChild(Text)
		n++
	}
}

//Tasks
function TaskSelect(Task) {
	const HPsub = [Task, localStorage.getItem("subject1"), localStorage.getItem("subject2"), localStorage.getItem("subject3"), localStorage.getItem("subject4")]
	if (HPsub[0] == HPsub[2]) {
		SelectAutomate(2, HPsub)
	} else if (HPsub[0] == HPsub[3]) {
		SelectAutomate(3, HPsub)
	} else if (localStorage.getItem("subject1") != Task) {
		SelectAutomate(4, HPsub)
	}
	localStorage.setItem("TopicSubject", Task)
	window.location.href = '../tasks/task-topics.html';
}

function SelectAutomate(n, array) {
	var y = 1
	while (y != (n + 1)) {
		localStorage.setItem("subject" + y, array[y - 1])
		y++
	}
}

function LoadTasks() {
	document.getElementById("Name").textContent = localStorage.getItem("Name")
	var SubjectCatagories = (Catagories["SubjectCatagories"] + 1)
	var x = 1
	var MainParent = document.getElementById("MainParent")
	while (x != SubjectCatagories) {
		var title = document.createElement("t")
		title.style = "font-size: 36px;font-family: 'Segoe UI'; color: #819ca1"
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
			Div.className = "subjectsquare"
			Div.id = Catagories[x]["Subjects"][y - 1]
			Div.setAttribute("onclick", "TaskSelect('" + subject + "')")
			MainParent.appendChild(Div)
			var Parent = document.getElementById(Catagories[x]["Subjects"][y - 1])

			var Image = document.createElement("img")
			Image.src = "../" + Sub["Image"]
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
	document.getElementById("Name").textContent = localStorage.getItem("Name")
	var SubjectCatagories = (Catagories["SubjectCatagories"] + 1)
	var x = 1
	var MainParent = document.getElementById("MainParent")
	while (x != SubjectCatagories) {
		var title = document.createElement("t")
		title.style = "font-size: 36px;font-family: 'Segoe UI'; color: #819ca1"
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
			Div.className = "subjectsquare"
			Div.id = Catagories[x]["Subjects"][y - 1]
			Div.setAttribute("onclick", "InfoSelect('" + subject + "')")
			MainParent.appendChild(Div)
			var Parent = document.getElementById(Catagories[x]["Subjects"][y - 1])

			var Image = document.createElement("img")
			Image.src = "../" + Sub["Image"]
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
}

//Task-Topics
function LoadTasksTopics() {
	document.getElementById("Name").textContent = localStorage.getItem("Name")
	var Sub;
	var subject = localStorage.getItem("TopicSubject");
	eval('Sub=' + subject + ';');
	document.getElementById("PleaseSelect").style.display = "block";
	document.getElementById("TheInfo").style.display = "none";
	document.getElementById("SubjectName").textContent = Sub["Name"];
	document.getElementById("SubjectImage").src = "../" + Sub["Image"];
	const TotalTopicN = (Sub["Ntopic"] + 1)
	var n = 1
	const mainparent = document.getElementById("TopicScrollbar")
	while (n != TotalTopicN) {
		var div = document.createElement("div")
		div.id = "Topic" + n
		div.setAttribute("onclick", "ResetTopic('" + subject + "', '" + n + "', 'Task')")
		div.className = "tasks-topic"
		mainparent.appendChild(div)
		const parent = document.getElementById("Topic" + n)

		var text = document.createElement("h2")
		text.textContent = Sub["Topics"][n]["Title"]
		parent.appendChild(text)
		n++
	}
}

//Info-Topics
function LoadInfoTopics() {
	document.getElementById("Name").textContent = localStorage.getItem("Name")
	var Sub;
	var subject = localStorage.getItem("TopicSubject");
	eval('Sub=' + subject + ';');
	document.getElementById("PleaseSelect").style.display = "block";
	document.getElementById("TheInfo").style.display = "none";
	document.getElementById("SubjectName").textContent = Sub["Name"];
	document.getElementById("SubjectImage").src = "../" + Sub["Image"];
	const TotalTopicN = (Sub["Ntopic"] + 1)
	var n = 1
	const mainparent = document.getElementById("TopicScrollbar")
	while (n != TotalTopicN) {
		var div = document.createElement("div")
		div.id = "Topic" + n
		div.setAttribute("onclick", "ResetTopic('" + subject + "', '" + n + "', 'Info')")
		div.className = "tasks-topic"
		mainparent.appendChild(div)
		const parent = document.getElementById("Topic" + n)

		var text = document.createElement("h2")
		text.textContent = Sub["Topics"][n]["Title"]
		parent.appendChild(text)
		n++
	}
}

//Topics
function ResetTopic(Database, TopicN, TorI) {
	document.getElementById("PleaseSelect").style.display = "none";
	document.getElementById("TheInfo").style.display = "block";
	var sub;
	var subject = Database;
	eval('sub=' + subject + ";");
	var Repeats = 1
	var RepeatMax = sub['Ntopic'] + 1
	while (Repeats != RepeatMax) {
		document.getElementById("Topic" + Repeats).classList.remove('activetask');
		Repeats++
	}
	document.getElementById("Topic" + TopicN).classList.add('activetask');
	document.getElementById("TaskTitle").textContent = sub["Topics"][TopicN]["Title"]
	document.getElementById("TaskImage").src = "../" + sub["Topics"][TopicN]["Image"];
	const subtopic = sub["Topics"][TopicN]["Title"];
	const maintopic = subject;
	const topicId = maintopic + subtopic;
	console.log(topicId)
	document.getElementById("quiz-button").href = `../quiz-jordan/index.html?quizId=${topicId}`
	if (TorI == "Task") {
		document.getElementById("TaskText").textContent = sub["Topics"][TopicN]["TaskText"];
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
	document.getElementById("Name").textContent = localStorage.getItem("Name")
	var Database = localStorage.getItem("QuizDatabase");
	var TopicN = localStorage.getItem("QuizTopic");
	var sub;
	var subject = Database;
	eval('sub=' + subject + ";");
	document.getElementById("Title").textContent = sub["Topics"][TopicN]["Quiz"]["1"]["Question"]
	document.getElementById("Image").src = sub["Topics"][TopicN]["Quiz"]["1"]["QuestionImage"]
	localStorage.setItem("CurrentQ", 0)
	QuizQuestion()
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
	if (Qtype == "4-Answer") {
		document.getElementById("A").classList.remove('quiz-active');
		document.getElementById("B").classList.remove('quiz-active');
		document.getElementById("C").classList.remove('quiz-active');
		document.getElementById("D").classList.remove('quiz-active');

	} else if (Qtype == "TrueFalse") {
		document.getElementById("True").classList.remove("quiz-active");
		document.getElementById("False").classList.remove("quiz-active");
	}
	if (SelectedAnswer == CorrectAnswer) {
		localStorage.setItem("CurrentQuizScore", (parseInt(localStorage.getItem("CurrentQuizScore")) + 1))
	}
	localStorage.setItem("CurrentQ", String(parseInt(localStorage.getItem("CurrentQ"))))
	prompt(localStorage.getItem("CurrentQuizScore"))
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
	if (QuestionType == "4-Answer") {
		HideQuiz("4-Answer")
		document.getElementById("Title").textContent = Sub["Topics"][CurrentT]["Quiz"][NewQ]["Question"]
		document.getElementById("Image").src = Sub["Topics"][CurrentT]["Quiz"][NewQ]["QuestionImage"]
		document.getElementById("Atext").textContent = Sub["Topics"][CurrentT]["Quiz"][NewQ]["PossibleAnswers"][0]
		document.getElementById("Btext").textContent = Sub["Topics"][CurrentT]["Quiz"][NewQ]["PossibleAnswers"][1]
		document.getElementById("Ctext").textContent = Sub["Topics"][CurrentT]["Quiz"][NewQ]["PossibleAnswers"][2]
		document.getElementById("Dtext").textContent = Sub["Topics"][CurrentT]["Quiz"][NewQ]["PossibleAnswers"][3]
	} else if (QuestionType == "TrueFalse") {
		HideQuiz("TrueFalse")
		document.getElementById("Title").textContent = Sub["Topics"][CurrentT]["Quiz"][NewQ]["Question"]
		document.getElementById("Image").src = Sub["Topics"][CurrentT]["Quiz"][NewQ]["QuestionImage"]
	} else if (QuestionType == "DragDrop") {
		HideQuiz("DragDrop")
	}
}

function HideQuiz(Quiz) {
	const Elements = ["A", "B", "C", "D", "True", "False", "drag1", "drag2", "drag3", "drag4", "drop1", "drop2", "drop3", "drop4"]
	var n = 0
	while (n != 14) {
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
	} else if (Quiz == "DragDrop") {
		N = 6
		maxN = 14
	}
	while (N != maxN) {
		document.getElementById(Elements[N]).style.display = "block";
		N++
	}
}

//Quiz Drag and Drop
var dragP;
/* Events fired on the drag target */

document.addEventListener("dragstart", function (event) {
	// The dataTransfer.setData() method sets the data type and the value of the dragged data
	// event.dataTransfer.setData("Text", event.target.id);
	dragP = event.target;

	// Change the opacity of the draggable element
	event.target.style.opacity = "0.4";
});

document.addEventListener("dragend", function (event) {
	event.target.style.opacity = "1";
});

document.addEventListener("dragenter", function (event) {
	if (event.target.className == "quiz-drop") {
		event.target.style.border = "3px dotted red";
		event.target.style.width = "294px"
	}
});

document.addEventListener("dragleave", function (event) {
	if (event.target.className == "quiz-drop") {
		event.target.style.border = "";
		event.target.style.width = "300px"
	}
});

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
	document.getElementById("Name").textContent = localStorage.getItem("Name")
	var parent = document.getElementById("Non-empty");
	var n = 1
	while (n != 11) {
		const mainDiv = document.createElement("div");
		mainDiv.className = "record-value"
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
	"Image": "Images/The Black Death.png",
	"Link": "task-topics.html",
	"Ntopic": 15,
	"Topics": {
		"1": {
			"Title": "Jobs",
			"Image": "Images/The Black Death/Jobs/Main Image.jpg",
			"TaskText": "In its entry on the Black Death, the 1347-50 outbreak of bubonic plague that killed at least a third of Europe’s population, this chronicle from the English city of Rochester includes among its harrowing details a seemingly trivial lament: Aristocrats and high clergymen not only had to pay triple wages to those toiling in their fields, but, even worse, they themselves had to perform manual labor. Curiously, the documentary record, which provides ample evidence that workers did demand and receive higher wages (on which more below), contains in contrast scant evidence that “worthies” ever dirtied their hands with fieldwork. Even if (or especially as) phantasms, however, these sickle-wielding lords reveal the importance of imagined possibilities in shaping pandemic responses.",
			"InfoText": "In its entry on the Black Death, the 1347–50 outbreak of bubonic plague that killed at least a third of Europe’s population, this chronicle from the English city of Rochester includes among its harrowing details a seemingly trivial lament: Aristocrats and high clergymen not only had to pay triple wages to those toiling in their fields, but, even worse, they themselves had to perform manual labor. Curiously, the documentary record, which provides ample evidence that workers did demand and receive higher wages (on which more below), contains in contrast scant evidence that “worthies” ever dirtied their hands with fieldwork. Even if (or especially as) phantasms, however, these sickle-wielding lords reveal the importance of imagined possibilities in shaping pandemic responses.",
		},
		"2": {
			"Title": "Doctors",
			"Image": "Images/The Black Death/Doctors/Main Image.png",
			"TaskText": "Plague doctors, physicians contracted by a government to tend to patients infected with plague during an epidemic, especially the plagues in Europe in the Middle Ages. Plague doctors were contracted by a city or town during an outbreak to treat plague patients specifically. The contract would outline the plague doctor’s responsibilities, boundaries, and pay and would often include the obligation to visit neighbourhoods hit hardest by plague and to treat even the poorest of patients who could not otherwise pay.",
			"InfoText": "Plague doctors, physicians contracted by a government to tend to patients infected with plague during an epidemic, especially the plagues in Europe in the Middle Ages. Plague doctors were contracted by a city or town during an outbreak to treat plague patients specifically. The contract would outline the plague doctor’s responsibilities, boundaries, and pay and would often include the obligation to visit neighbourhoods hit hardest by plague and to treat even the poorest of patients who could not otherwise pay."

		},
		"3": {
			"Title": "Religion",
			"Image": "Images/The Black Death/Religion/Main Image.jpg",
			"TaskText": "Accordingly, people reacted with hopeful cures and responses based on religious belief, folklore and superstition, and medical knowledge, all of which were informed by Catholic Christianity in the West and Islam in the Near East. These responses took many forms but, overall, did nothing to stop the spread of the disease or save those who had been infected. The recorded responses to the outbreak come from Christian and Muslim writers primarily since many works by European Jews – and many of the people themselves – were burned by Christians who blamed them for the plague and among these works, may have been treatises on the plague.",
		},
		"4": {
			"Title": "Causes",
			"Image": "Images/The Black Death/Causes/Main Image.jpg",
			"TaskText": "The Black Death is believed to have been the result of plague, an infectious fever caused by the bacterium Yersinia pestis. The disease was likely transmitted from rodents to humans by the bite of infected fleas."
		},
		"5": {
			"Title": "Trade",
			"Image": "Images/The Black Death/Trade/Main Image.png",
			"TaskText": "The medieval Silk Road brought a wealth of goods, spices, and new ideas from China and Central Asia to Europe. In 1346, the trade also likely carried the deadly bubonic plague that killed as many as half of all Europeans within 7 years, in what is known as the Black Death. Later outbreaks in Europe were thought to have arrived from the east via a similar route. Now, scientists have evidence that a virulent strain of the Black Death bacterium lurked for centuries in Europe while also working its way back to Asia, with terrifying consequences.",
		},
		"6": {
			"Title": "Symptoms",
			"Image": "Images/The Black Death/Symptoms/Main Image.jpg",
			"TaskText": "Patients develop fever, headache, chills, and weakness and one or more swollen, painful lymph nodes (called buboes). This form usually results from the bite of an infected flea, with an incubation period of 2 to 8 days. The bacteria multiply in a lymph node near where the bacteria entered the human body. If the patient is not treated with the appropriate antibiotics, the bacteria can spread to other parts of the body.",
		},
		"7": {
			"Title": "Treatment",
			"Image": "Images/The Black Death/Treatment/Main Image.jpg",
			"TaskText": "When the Black Death struck, medieval physicians turned to this theory in an effort to combat the disease, as well as trying new treatments. Along with tried-and-true treatments, medieval doctors were desperate enough to try anything to stop the pandemic, the likes of which they had not seen before."
		},
		"8": {
			"Title": "Spreading",
			"Image": "Images/The Black Death/Spreading/Main Image.jpg",
			"TaskText": "It was most likely carried by fleas living on the black rats that travelled on Genoese ships, spreading through the Mediterranean Basin and reaching North Africa, Western Asia, and the rest of Europe via Constantinople, Sicily, and the Italian Peninsula."
		},
		"9": {
			"Title": "Responses",
			"Image": "Images/The Black Death/Responses/Main Image.png",
			"TaskText": "Doctors refused to see patients; priests refused to administer last rites; and shopkeepers closed their stores. Many people fled the cities for the countryside, but even there they could not escape the disease: It affected cows, sheep, goats, pigs and chickens as well as people."
		},
		"10": {
			"Title": "Asia",
			"Image": "Images/The Black Death/Asia/Main Image.jpeg",
			"TaskText": "Firsthand accounts of the Black Death in Europe and the Middle East and many subsequent historians have assumed that the pandemic originated in Asia and ravaged China and India before reaching the West. One reason for this conviction among modern historians is that the plague in the nineteenth century originated and did its worst damage in these countries. But a close examination of the sources on the Delhi Sultanate and the Yuan Dynasty provides no evidence of any serious epidemic in fourteenth-century India and no specific evidence of plague among the many troubles that afflicted fourteenth-century China."
		},
		"11": {
			"Title": "Africa",
			"Image": "Images/The Black Death/Africa/Main Image.jpg",
			"TaskText": "The first appearance of the Black Death in Africa was in Alexandria which was recorded by the great medieval Arabic-Egyptian historian Al-Maqrizi as having come from a slave-ship from the Golden Horde via Constantinople in 1347.[2] From there the disease spread along the trade routes, reaching up the Nile to Upper Egypt by 1349 and along the coast."
		},
		"12": {
			"Title": "Europe",
			"Image": "Images/The Black Death/Europe/Main Image.jpg",
			"TaskText": "Black Death, pandemic that ravaged Europe between 1347 and 1351, taking a proportionately greater toll of life than any other known epidemic or war up to that time. The Black Death is widely believed to have been the result of plague, caused by infection with the bacterium Yersinia pestis."
		},
		"13": {
			"Title": "Short-Term",
			"Image": "Images/The Black Death/Short-Term/Main Image.png",
			"TaskText": "The effects of the Black Death were many and varied. Trade suffered for a time, and wars were temporarily abandoned. Many labourers died, which devastated families through lost means of survival and caused personal suffering; landowners who used labourers as tenant farmers were also affected."
		},
		"14": {
			"Title": "Long-Term",
			"Image": "Images/The Black Death/Long-Term/Main Image.png",
			"TaskText": "The consequences of this violent catastrophe were many. A cessation of wars and a sudden slump in trade immediately followed but were only of short duration. A more lasting and serious consequence was the drastic reduction of the amount of land under cultivation, due to the deaths of so many labourers."
		},
		"15": {
			"Title": "Feudal System",
			"Image": "Images/The Black Death/Feudal System/Main Image.jpg",
			"TaskText": "Feudalism flourished in Europe between the 9th and 15th centuries. Feudalism in England determined the structure of society around relationships derived from the holding and leasing of land, or fiefs. In England, the feudal pyramid was made up of the king at the top with the nobles, knights, and vassals below him."
		},
	}
}

const TheRomanEmpire = {
	"Name": "The Roman Empire",
	"Image": "Images/Roman Colosseum.png"
}

const AncientEgypt = {
	"Name": "Ancient Egypt",
	"Image": "Images/Great Pyramids.png"
}

const AncientJapan = {
	"Name": "Ancient Japan",
	"Image": "Images/Torii Gate.png"
}

const AncientChina = {
	"Name": "Ancient China",
	"Image": "Images/Chinese Dragon.png"
}

const TheBritishEmpire = {
	"Name": "The British Empire",
	"Image": "Images/Crown.png"
}

const Chemistry = {
	"Name": "Chemistry",
	"Image": "Images/Chemistry.png",
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
	"Ntopic": 1,
	"Topics": {
		"1": {
			"Title": "Baptism",
			"Image": "Images/Sacraments/Baptism/Main Image.png",
			"TaskText": "In Baptism God our Father welcomes us into the church community. It is the first Sacrament of Initiation. In Baptism we become children of God and shave in the new life of Jesus and we celebrate the presence of the Holy Spirit. The Priest starts by pouring water over the head of the baby/adult, before saying \"I Baptise you in the name of the Father, and the son, and the holy spirit\" and giving the child their name before making the sign of the cross on the recipients head in holy oil. A candle is then given to the god-parents and everyone prays together with the baby being placed in a white garment",
			"InfoText": "In Baptism God our Father welcomes us into the church community. It is the first Sacrament of Initiation. In Baptism we become children of God and shave in the new life of Jesus and we celebrate the presence of the Holy Spirit. The Priest starts by pouring water over the head of the baby/adult, before saying \"I Baptise you in the name of the Father, and the son, and the holy spirit\" and giving the child their name before making the sign of the cross on the recipients head in holy oil. A candle is then given to the god-parents and everyone prays together with the baby being placed in a white garment. <br><br> Each step of Baptism holds large amounts of symbolism and reasoning. The Water used to begin the Ceremony symbolises the Cleansing of the soul from original sin. The Holy Oil of Catechumens is used to make the sign of the cross on the baby/adults forehead. This oil is used specifically because it helps strengthen the person's resilience against the devil and sin. The Candle given to the godparents shows Jesus Christ, the Light of the World. Not only Priests Can baptise people, as anyone is able to baptise a person if their life is endangered and a priest is unavailable. The Sacrament of Baptism has occured many times, one of the most famous Baptists was St Jhon the Baptist. One of the Most famous Prayers, the Apostles Creed is Said at all Sacraments, Baptism not excluded.",
			"Quiz": {
				"1": {
					"QuestionType": "4-Answer",
					"Question": "Which Sacrament of Initiation is Baptism?",
					"QuestionImage": "Images/Sacraments/Baptism/Initiation.png",
					"PossibleAnswers": ["The First", "The Second", "The Third", "The Fourth"],
					"Answer": "A",
				},
				"2": {
					"QuestionType": "DragDrop",
					"Question": "In what order does Baptism Occur?",
					"Selection": ["A Candle is Given to the God Parents", "Water is Poured over the Recipients Head", "The Priest Baptises the Recipient", "A cross is made with with Holy Oil"],
					"Answer": ["2", "4", "3", "1"]
				},
				"3": {
					"QuestionType": "4-Answer",
					"Question": "What Holy oil is used in Baptism?",
					"PossibleAnswers": ["Holy Oil", "Oil of Catechumens", "Oil of Chrism", "Vegetable Oil"],
					"Answer": "B",
				},
				"4": {
					"QuestionType": "TrueFalse",
					"Question": "Because Baptisms are usually done in the Dark, the Candle is used to light the room",
					"Answer": "False"
				},
				"5": {
					"QuestionType": "4-Answer",
					"Question": "The oil used in Baptism helps Strengthen the Recipient. What does it help them become Resilient Against?",
					"PossibleAnswers": ["Garlic", "People", "Cats", "The Devil"],
					"Answer": "D",
				},
				"6": {
					"QuestionType": "4-Answer",
					"Question": "What Does the Candle Given to the Godparents Represent",
					"PossibleAnswers": ["Jesus Christ", "Purity of the Soul", "Love", "Fire"],
					"Answer": "A",
				},
				"7": {
					"QuestionType": "TrueFalse",
					"Question": "Only Priests Can Baptise People",
					"Answer": "False",
				},
				"8": {
					"QuestionType": "DragDrop",
					"Question": "The _____ Is anointed with _____ by the _____ before being covered with a _____",
					"Selection": ["White Garment", "Recipient", "Holy Oil", "Priest"],
					"Answer": ["2", "3", "4", "1"]
				},
				"9": {
					"QuestionType": "4-Answer",
					"Question": "What Saint Baptised people in the Jordan River",
					"PossibleAnswers": ["St Vincent De Paul", "St Francis of Assisi", "St John", "St Maximilian Kolbe"],
					"Answer": "C",
				},
				"10": {
					"QuestionType": "TrueFalse",
					"Question": "The Apostles Creed is told at all Baptisms",
					"Answer": "True",
				}
			}
		}
	}
}
