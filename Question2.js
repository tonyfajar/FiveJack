const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => {
	var users =   [2,1,2,6,2,4,3,3];
	var N = 5;
	console.log(`Server running at http://${hostname}:${port}/`);
	console.log(solution(N, users))
});

function solution(N,users) {
	var answer = [];
	var number_of_users = users.length;
	var vailure_rate = [];
	var number_of_users_exists = users.length;


	//check if users more than 200000
	if(users.length > 200000) {
		return 'Max users is 200.000';
	}
	for(i=0;i<users.length;i++){
		//validation to check there no users stager more than N+1
		if(users[i] > N+1){
			return 'Any invalid users stage in Record number: '+i+ ' ('+users[i]+')';
		}
	}


	for(i=1;i<=N;i++){
		var vailure_rate_inner = [];
		var vailure_users = 0; 

		for(j=0;j<users.length;j++){
			if(i == users[j]){
				vailure_users = vailure_users + 1;
			}
		}
		vailure_rate_inner.push(i);
		vailure_rate_inner.push(vailure_users/number_of_users_exists);
		vailure_rate.push(vailure_rate_inner);
		number_of_users_exists = number_of_users_exists - vailure_users;

	}

	vailure_rate = vailure_rate.sort(function(a,b){ 
		if (a[1] === b[1]) {
			return (a[0] > b[0]) ? -1 : 1;
		}
		else {
			
			return (a[1] < b[1]) ? -1 : 1;
		}
		//return a[1] - b[1] 
	});
	vailure_rate = vailure_rate.reverse();
	
	for(i=0;i<N;i++){
		answer.push(vailure_rate[i][0]);
	}
	return answer;
}