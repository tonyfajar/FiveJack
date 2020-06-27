const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => {
	
	var relations = [['100','ryan',"music","2"],['200','apeach',"math","2"],['300','tube',"computer","3"],['400','con',"computer","4"],['500','muzi',"music","3"],['600','apeach',"music","2"]];
	//var relations = [['100','ryan',"music","A01"],['200','apeach',"math","A02"],['300','tube',"computer","A03"],['400','con',"computer","A04"],['500','muzi',"music","A05"],['600','apeach',"music","A06"]];
	//var relations = [['100','ryan'],['200','apeach'],['300','tube'],['400','con'],['500','muzi'],['600','apeach']];
	console.log(`Server running at http://${hostname}:${port}/`);
	console.log(solution(relations));
});

function solution(relations) {
	var answer = 0;
	var regex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g;
	var candidate = [];
	var row = relations;

	//var column = row[0];
	var row_number = row.length;
	var column_number = row[0].length;
	

	//check if relation row more than 20
	if(row.length > 20) {
		return 'Max users is 20';
	}
	
	for(var i=0;i<row.length;i++){
		
		//validation to check all is array two-dimensional 
		if(row[i].constructor !== Array){
			return 'Any invalid relations in Record number: '+i+ ' ('+row[i]+')';
		}
		
		//check if relation column more than 8
		if(row[i].length > 8){
			return 'Any invalid relations in Record number: '+i+ ' ('+row[i]+'), max relation column is 8';
		}
		
		for(var j=0;j<row[i].length;j++){
			//validation if any special char  
			if(row[i][j].length > 8 || regex.test(row[i][j])){
				return 'Any invalid relations in Record number: '+i+ ' ('+row[i]+'), max relation column is 8 with no special character';
			}
		}
		
	}
	var relation = [];
	for(var  i=1;i<=column_number;i++){
		//console.log("");
		//console.log("===== SOLUSION 1 =====");
		
		var column = row[i];
		for(var j=0;j<column_number;j++){	
			//console.log("===== SOLUSION 2 =====");
			var column_checking = columnChecking(column_number);
			checkingCandidate(j,1,i,column_checking,relations,relation);
		}
	}
	return "JAWABANYA : "+relation.length;
}

function columnChecking(n){
	var clmn = [];
	for(var a=0;a<n;a++){
		clmn[a] = 0;
	}
	return clmn;
}

function checkingCandidate(x,limit, max,columnOnChecking, relations,relation){
	
	//console.log("===== checkingCandidate =====");
	//console.log('RELASTION : '+relation);
	columnOnChecking[x] = 1;
	
	if(limit == max){
		//console.log('columnOnChecking : '+columnOnChecking);
		var candidate = [];
		for(var a=0;a<relations.length;a++){
			var candidate_inner = [];
			for(var b=0;b<relations[0].length;b++){
				if(columnOnChecking[b] == 1){
					candidate_inner.push(relations[a][b]);
				}
			}
			var isExists = false;
			for(var b=0;b<candidate.length;b++){
				if(candidate[b].toString() == candidate_inner.toString())
					isExists = true;
			}
			
			if(!isExists){
				candidate.push(candidate_inner);
			}
		}
		//console.log(candidate);
		if(candidate.length == relations.length){
			//console.log(candidate);	
			var check = '';
			//console.log('CHECK BEFORE : '+check);
			for(var a=0;a<relations[0].length;a++){
				//console.log(columnOnChecking[a]);
				if(columnOnChecking[a] == 1) check += a;
			}
			//console.log(relation);
			//console.log('CHECK AFTER : '+check);
			var check_point = 0;
			for (var iterator = relation[Symbol.iterator](), r; !(r = iterator.next()).done;) {
				//console.log("NEXT : "+r.value);
				var value = r.value;
				var count = 0;
				for(var a=0;a<value.length;a++){
					for(var b=0;b<check.length;b++){
						if(value.charAt(a) == check.charAt(b)) count++;
					}
				}
				if(count == value.length)check_point = 1;
			}
			if(check_point == 0) relation.push(check);
		}
		columnOnChecking[x] = 0;
		return;
	}
	for(var d=x;d<relations[0].length;d++){
		if(columnOnChecking[d] == 0){
			checkingCandidate(d,limit+1,max,columnOnChecking, relations, relation);
		}
	}
	columnOnChecking[x] = 0;
}