%** Test graph **%
node(1). node(2). node(3).
edge(1,2). edge(1,3). edge(2,3).

%** @rule(name=r1, blocks=ToTest) **%
col(X,red) | col(X,blue) | col(X,green) :- node(X).

%** @rule(name=r2, blocks=ToTest) **%
:- edge(X, Y), col(X,C), col(Y,C).

%**@test{
	"name" : "checkRules",
	"scope" : [ "ToTest" ],
	"input" : "node(1) node(2) node(3) edge(1,2) edge(1,3) edge(2,3)",
	"assert" : [
	"@noAnswerSet{}",
	"@trueInAll{ 'atoms' : 'node(1)' }"  
	],
	"file" : "assets/input2.asp"
	}
**%