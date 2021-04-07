# hash-test

`npx webpack --config webpack.config.js && python3 -m http.server 8000 --directory dist`



Just the sponge fn with the rounds exposed
https://github.com/jacobrosenthal/mimc-fast/tree/v6-tide-split-wasm-sponge

sadly still returning a string, because despite browser support of big numbers, theyre not supported from rust. the biggest number I can return is a u64 and our numbers are u512s


Brave:
```
main.js:1 loading
main.js:1 Call to mimc average 262042.09250000166 milliseconds.
main.js:1 


main.js:1 Call to js 22.777500000287546 milliseconds.
```


10000x worse, espcially as a the vm starts heating up


Not sure how it could be that bad