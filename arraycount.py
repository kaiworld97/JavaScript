aaaa={}
count = ["ant","ant","ant","ant","ant","ant","ant","ant","ant","ant","ant","ant","a","b",'apple','w','wf']
# 리스트의 요소의 이름과 갯수를 딕셔너리화하기
for i in count:
    try: aaaa[i] += 1
    except: aaaa[i]=1

# 딕셔너리의 키를 리스트화하기 
co = list(aaaa.keys())

# 키와 밸류(갯수) 프린트
for c in co:
    print(c)
    print(aaaa.get(c))
