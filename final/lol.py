import hashlib
string = "asdf"

a = hashlib.sha3_256(string.encode()).hexdigest()
print(a)