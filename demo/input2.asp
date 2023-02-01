%** Test graph **%
node(1). node(2). node(3).
edge(1,2). edge(1,3). edge(2,3).

%** @rule(labels=ToTest) **%
col(X,red) | col(X,blue) | col(X,green) :- node(X).

%** @rule(labels=ToTest) **%
:- edge(X, Y), col(X,C), col(Y,C).

%**@test{
	"name" : "checkRules",
	"scope" : [ "ToTest" ],
	"input" : "node(1) node(2) node(3) edge(1,2) edge(1,3) edge(2,3)",
	"assert" : [
	"@noAnswerSet{}",
	"@trueInAll{ 'atoms' : 'node(1)' }",
	"@trueInExactly{ 'number' : 2, 'atoms' : 'col(1,red)' }",
	"@trueInExactly{ 'number' : 1, 'atoms' : 'col(1,red) col(2,blue)' }"  

	],
	"file" : "/home/maiku/Documents/RDM/progetto/demo/input2.asp"
	}
**%