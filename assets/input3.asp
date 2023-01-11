%** @rule(labels=ToTest) **%
a(X) :- b(X).

%** @rule(labels=ToTest) **%
c(X) | d(X) :- a(X).

%**@test{
	"name" : "checkConstr",
	"scope" : [ "ToTest" ],
	"input" : "a(1)",
	"assert" : [
	"@constraintInAll{ 'constraints': 'c(1).' }",
	"@constraintInAtMost{'number' : 2, 'constraints': 'c(1).' }",
	"@constraintInAtLeast{'number' : 2, 'constraints': 'c(1).' }",
	"@constraintInAtExactly{'number' : 1, 'constraints': 'c(1).' }"
	],
	"file" : "assets/input3.asp"
	}
**%

