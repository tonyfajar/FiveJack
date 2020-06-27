const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => {
	var records = ["Enter uid1234 Muzi", "Enter uid4567 Prodo", "Leave uid1234", "Enter uid1234 Prodo", "Change uid4567 Ryan"];
	console.log(`Server running at http://${hostname}:${port}/`);
	console.log(solution(records))
});

function solution(records) {
	var answer = [];
	
	//check if record more than 100000
	if(records.length > 100000) {
		return 'Max Record is 100.000';
    }
	
	//validation record
	var uid_name = [];
	var uid_activity = [];
	var regex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g;
	
	
	for(i=0;i<records.length;i++){
		var record = records[i].split(" ");
		var uid_name_inner = [];
		var uid_activity_inner = [];
		//validation if any special char
		if(regex.test(records[i])){
			return 'Any special Characters in Record number: '+i+ ' ('+records[i]+')';
		}
		switch(record[0]){
			case 'Enter':
				if(uid_name.length == 0){
					uid_name_inner.push(record[1]);
					uid_name_inner.push(record[2]);
				}else{
					if(!uid_name.some(row => row.includes(record[1]))){
						uid_name_inner.push(record[1]);
						uid_name_inner.push(record[2]);
					}else{
						for(j=0;j<uid_name.length;j++){
							if(uid_name[j][0] == record[1]){
								uid_name[j].splice(1,1,record[2]);
							}
						}
					}
				}
				
				//validation if any user id or nickname more than 10 char
				if(record[1].length > 10 || record[2].length > 10){
					return 'Max length of User ID Or Nick Name is more than 10 charactercs in Record number: '+i+ ' ('+records[i]+')';
				}
				
				uid_activity_inner.push(record[1]);
				uid_activity_inner.push('came in');
				
				break;
			case 'Leave':
				
				//validation if invalid userid
				if(!uid_name.some(row => row.includes(record[1]))){
					return 'Any unknown UID in Record number: '+i+ ' ('+records[i]+')';
				}
				
				uid_activity_inner.push(record[1]);
				uid_activity_inner.push('has left');
				
				break;
				
			case 'Change':
				//validation if invalid userid
				if(!uid_name.some(row => row.includes(record[1]))){
					return 'Any unknown UID in Record number: '+i+ ' ('+records[i]+')';
				}
				
				//validation if any user id or nickname more than 10 char
				if(record[1].length > 10 || record[2].length > 10){
					return 'Max length of User ID Or Nick Name is more than 10 charactercs in Record number: '+i+ ' ('+records[i]+')';
				}
				
				//Change nickname
				for(j=0;j<uid_name.length;j++){
					if(uid_name[j][0] == record[1]){
						uid_name[j].splice(1,1,record[2]);
					}
				}
				
				break;
				
			default:
				//validation if any wrong first word
				return 'The First Word in Record number : '+ i + ' ('+records[i]+')'+' is unknown';
		}
		
		if(uid_name_inner.length !== 0){
			uid_name.push(uid_name_inner);
		}
		if(uid_activity_inner.length !== 0){
			uid_activity.push(uid_activity_inner);
		}
		
	}
	for(i=0;i<uid_activity.length;i++){
		for(j=0;j<uid_name.length;j++){
			if(uid_activity[i][0] == uid_name[j][0]){
				answer.push(uid_name[j][1] +' ' +uid_activity[i][1]);
			}
		}
	}
	return answer;
}