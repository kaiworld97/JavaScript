count = ["ant","ant","ant","ant","ant","ant","ant","ant","ant","ant","ant","ant","a","b",'apple','w','wf']
# for in 문 돌리고 나온거 리스트에 넣기
aaaa = [aaa for aaa in count]

print(aaaa)

# c = a+b결과를 리스트에 넣기
bbbb = [a+b for a in [0,7] for b in [0,1,3]]

print(bbbb)

# groupby 두개 묶은거 name 리스트로 보기 
# bb = csv 파일임
# qq = bb.groupby(["Name", "Message"])
# aaaa = [name for name,group in qq]

# print(aaaa)