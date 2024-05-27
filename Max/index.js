
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

//Homepage
function LoadHomepageSubjects() {
	const numbers = [1, 2, 3, 4];
	for (const n of numbers) {
		var Sub;
		var link;
		var subject = localStorage.getItem("subject" + n);
		eval('Sub=' + subject + ';');
		document.getElementById("Subject" + n + "Name").textContent=Sub["Name"];
		document.getElementById("Subject" + n + "Picture").src = Sub["Image"];
		link = document.getElementById("Subject" + n + "Link");
		link.setAttribute("href", Sub["Link"]);
	}
}

//Tasks
function LoadTasks() {
	var Sub;
	var subject = localStorage.getItem("TopicSubject");
	eval('Sub=' + subject + ';');
	document.getElementById("PleaseSelect").style.display = "block";
	document.getElementById("TheInfo").style.display = "none";
	document.getElementById("SubjectName").textContent=Sub["Name"];
	document.getElementById("SubjectImage").src = Sub["Image"];
}

function TaskSelect(Task) {
	const HPsub = [Task, localStorage.getItem("subject1"), localStorage.getItem("subject2"), localStorage.getItem("subject3"), localStorage.getItem("subject4")]
	if (HPsub[0] == HPsub[2]){
		localStorage.setItem("subject1", HPsub[0])
		localStorage.setItem("subject2", HPsub[1])
	} else if (HPsub[0] == HPsub[3]) {
		localStorage.setItem("subject1", HPsub[0])
		localStorage.setItem("subject2", HPsub[1])
		localStorage.setItem("subject3", HPsub[2])
	} else if (localStorage.getItem("subject1") != Task) {
		localStorage.setItem("subject1", HPsub[0])
		localStorage.setItem("subject2", HPsub[1])
		localStorage.setItem("subject3", HPsub[2])
		localStorage.setItem("subject4", HPsub[3])
	}
	localStorage.setItem("TopicSubject", Task)
	window.location.href = 'task-topics.html';
}

function InfoSelect(Info) {
	const HPsub = [Info, localStorage.getItem("subject1"), localStorage.getItem("subject2"), localStorage.getItem("subject3"), localStorage.getItem("subject4")]
	if (HPsub[0] == HPsub[2]){
		localStorage.setItem("subject1", HPsub[0])
		localStorage.setItem("subject2", HPsub[1])
	} else if (HPsub[0] == HPsub[3]) {
		localStorage.setItem("subject1", HPsub[0])
		localStorage.setItem("subject2", HPsub[1])
		localStorage.setItem("subject3", HPsub[2])
	} else if (localStorage.getItem("subject1") != Info) {
		localStorage.setItem("subject1", HPsub[0])
		localStorage.setItem("subject2", HPsub[1])
		localStorage.setItem("subject3", HPsub[2])
		localStorage.setItem("subject4", HPsub[3])
	}
	localStorage.setItem("TopicSubject", Info)
	window.location.href = 'info-topics.html';
}

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
	document.getElementById("TaskImage").src = sub["Topics"][TopicN]["Image"];
	if (TorI == "Task") {
		document.getElementById("TaskText").textContent = sub["Topics"][TopicN]["TaskText"];
	} else {
		document.getElementById("TaskText").textContent = sub["Topics"][TopicN]["InfoText"]
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
	document.getElementById("TellMeTheTopic").textContent = sub["Topics"][TopicN]["Title"]
}

//Record
function UpdateRecord(Type, Subject, Topic) {
	const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
	const date = new Date();
	var datetime = date.getDate() + " / " + (date.getMonth()+1)
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
		localStorage.setItem("RecordType" + n, recordType[n-1]);
		localStorage.setItem("RecordSubject" + n, recordSubject[n-1]);
		localStorage.setItem("RecordTopic" + n, recordTopic[n-1]);
		localStorage.setItem("RecordDate" + n, recordDate[n-1]);
	}
}

function LoadRecord() {
	var parent = document.getElementById("Non-empty");
	var n = 1
	while (n != 11) {
		var node = document.createElement("div");
		node.innerHTML = '<div class="record-value" id="entry'+n+'"><div class="record-inside RI-text" id="type'+n+'"><h5></h5></div><div class="record-inside RI-divider"><h5>|</h5></div><div class="record-inside RI-text" id="subject'+n+'"><h5></h5></div><div class="record-inside RI-divider"><h5>|</h5></div><div class="record-inside RI-text" id="topic'+n+'"><h5></h5></div><div class="record-inside RI-divider"><h5>|</h5></div><div class="record-inside RI-text" id="date'+n+'"><h5></h5></div></div>'
		parent.appendChild(node)
		var Type = localStorage.getItem("RecordType" + n)
		var Subject = localStorage.getItem("RecordSubject" + n)
		var Topic = localStorage.getItem("RecordTopic" + n)
		var Date = localStorage.getItem("RecordDate" + n)
		if (Type == "null") {
			document.getElementById("entry" + n).style.display = "none"
		} else {
			document.getElementById("type" + n).textContent = Type
			document.getElementById("subject" + n).textContent = Subject
			document.getElementById("topic" + n).textContent = Topic
			document.getElementById("date" + n).textContent = Date
		}
		n++
	}
}

//Databases
const Catagories = {
	"SubjectCatagories" : "1",
	"1" : {
		"Title" : "History",
		"Amount" : "5",
		"Subjects" : ["TheBlackDeath", "TheRomanEmpire", "AncientEgypt", "AncientJapan", "MedievalEurope"]
	}
}

const TheBlackDeath = {
	"Name": "The Black Death",
	"Image": "Images/The Black Death/The Black Death.png",
	"Link" : "task-topics.html",
	"Ntopic" : 15,
	"Topics" : {
		"1" : {
			"Title" : "Jobs",
			"Image" : "Images/The Black Death/Jobs/Main Image.jpg",
			"TaskText" : "In its entry on the Black Death, the 1347–50 outbreak of bubonic plague that killed at least a third of Europe’s population, this chronicle from the English city of Rochester includes among its harrowing details a seemingly trivial lament: Aristocrats and high clergymen not only had to pay triple wages to those toiling in their fields, but, even worse, they themselves had to perform manual labor. Curiously, the documentary record, which provides ample evidence that workers did demand and receive higher wages (on which more below), contains in contrast scant evidence that “worthies” ever dirtied their hands with fieldwork. Even if (or especially as) phantasms, however, these sickle-wielding lords reveal the importance of imagined possibilities in shaping pandemic responses.",
		},
		"2" : {
			"Title" : "Doctors",
			"Image" : "Images/The Black Death/Doctors/Main Image.png",
			"TaskText" : "Plague doctors, physicians contracted by a government to tend to patients infected with plague during an epidemic, especially the plagues in Europe in the Middle Ages. Plague doctors were contracted by a city or town during an outbreak to treat plague patients specifically. The contract would outline the plague doctor’s responsibilities, boundaries, and pay and would often include the obligation to visit neighbourhoods hit hardest by plague and to treat even the poorest of patients who could not otherwise pay."
		},
		"3" : {
			"Title" : "Religion",
			"Image" : "Images/The Black Death/Religion/Main Image.jpg",
			"TaskText" : "Accordingly, people reacted with hopeful cures and responses based on religious belief, folklore and superstition, and medical knowledge, all of which were informed by Catholic Christianity in the West and Islam in the Near East. These responses took many forms but, overall, did nothing to stop the spread of the disease or save those who had been infected. The recorded responses to the outbreak come from Christian and Muslim writers primarily since many works by European Jews – and many of the people themselves – were burned by Christians who blamed them for the plague and among these works, may have been treatises on the plague."
		},
		"4" : {
			"Title" : "Causes",
			"Image" : "Images/The Black Death/Causes/Main Image.jpg",
			"TaskText" : "The Black Death is believed to have been the result of plague, an infectious fever caused by the bacterium Yersinia pestis. The disease was likely transmitted from rodents to humans by the bite of infected fleas."
		}, 
		"5" : {
			"Title" : "Trade",
			"Image" : "Images/The Black Death/Trade/Main Image.png",
			"TaskText" : "The medieval Silk Road brought a wealth of goods, spices, and new ideas from China and Central Asia to Europe. In 1346, the trade also likely carried the deadly bubonic plague that killed as many as half of all Europeans within 7 years, in what is known as the Black Death. Later outbreaks in Europe were thought to have arrived from the east via a similar route. Now, scientists have evidence that a virulent strain of the Black Death bacterium lurked for centuries in Europe while also working its way back to Asia, with terrifying consequences."
		},
		"6" : {
			"Title" : "Symptoms",
			"Image" : "Images/The Black Death/Symptoms/Main Image.jpg",
			"TaskText" : "Patients develop fever, headache, chills, and weakness and one or more swollen, painful lymph nodes (called buboes). This form usually results from the bite of an infected flea, with an incubation period of 2 to 8 days. The bacteria multiply in a lymph node near where the bacteria entered the human body. If the patient is not treated with the appropriate antibiotics, the bacteria can spread to other parts of the body."
		},
		"7" : {
			"Title" : "Treatment",
			"Image" : "Images/The Black Death/Treatment/Main Image.jpg",
			"TaskText" : "When the Black Death struck, medieval physicians turned to this theory in an effort to combat the disease, as well as trying new treatments. Along with tried-and-true treatments, medieval doctors were desperate enough to try anything to stop the pandemic, the likes of which they had not seen before."
		},
		"8" : {
			"Title" : "Spreading",
			"Image" : "Images/The Black Death/Spreading/Main Image.jpg",
			"TaskText" : "It was most likely carried by fleas living on the black rats that travelled on Genoese ships, spreading through the Mediterranean Basin and reaching North Africa, Western Asia, and the rest of Europe via Constantinople, Sicily, and the Italian Peninsula."
		},
		"9" : {
			"Title" : "Responses",
			"Image" : "Images/The Black Death/Responses/Main Image.png",
			"TaskText" : "Doctors refused to see patients; priests refused to administer last rites; and shopkeepers closed their stores. Many people fled the cities for the countryside, but even there they could not escape the disease: It affected cows, sheep, goats, pigs and chickens as well as people."
		},
		"10" : {
			"Title" : "Asia",
			"Image" : "Images/The Black Death/Asia/Main Image.jpeg",
			"TaskText" : "Firsthand accounts of the Black Death in Europe and the Middle East and many subsequent historians have assumed that the pandemic originated in Asia and ravaged China and India before reaching the West. One reason for this conviction among modern historians is that the plague in the nineteenth century originated and did its worst damage in these countries. But a close examination of the sources on the Delhi Sultanate and the Yuan Dynasty provides no evidence of any serious epidemic in fourteenth-century India and no specific evidence of plague among the many troubles that afflicted fourteenth-century China."
		},
		"11" : {
			"Title" : "Africa",
			"Image" : "Images/The Black Death/Africa/Main Image.jpg",
			"TaskText" : "The first appearance of the Black Death in Africa was in Alexandria which was recorded by the great medieval Arabic-Egyptian historian Al-Maqrizi as having come from a slave-ship from the Golden Horde via Constantinople in 1347.[2] From there the disease spread along the trade routes, reaching up the Nile to Upper Egypt by 1349 and along the coast." 
		},
		"12" : {
			"Title" : "Europe",
			"Image" : "Images/The Black Death/Europe/Main Image.jpg",
			"TaskText" : "Black Death, pandemic that ravaged Europe between 1347 and 1351, taking a proportionately greater toll of life than any other known epidemic or war up to that time. The Black Death is widely believed to have been the result of plague, caused by infection with the bacterium Yersinia pestis."
		},
		"13" : {
			"Title" : "Short-Term",
			"Image" : "Images/The Black Death/Short-Term/Main Image.png",
			"TaskText" : "The effects of the Black Death were many and varied. Trade suffered for a time, and wars were temporarily abandoned. Many labourers died, which devastated families through lost means of survival and caused personal suffering; landowners who used labourers as tenant farmers were also affected."
		},
		"14" : {
			"Title" : "Long-Term",
			"Image" : "Images/The Black Death/Long-Term/Main Image.png",
			"TaskText" : "The consequences of this violent catastrophe were many. A cessation of wars and a sudden slump in trade immediately followed but were only of short duration. A more lasting and serious consequence was the drastic reduction of the amount of land under cultivation, due to the deaths of so many labourers."
		},
		"15" : {
			"Title" : "Feudal System",
			"Image" : "Images/The Black Death/Feudal System/Main Image.jpg",
			"TaskText" : "Feudalism flourished in Europe between the 9th and 15th centuries. Feudalism in England determined the structure of society around relationships derived from the holding and leasing of land, or fiefs. In England, the feudal pyramid was made up of the king at the top with the nobles, knights, and vassals below him."
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

const MedievalEurope = {
	"Name": "Medieval Europe",
	"Image": "Images/Castle.png"
}
