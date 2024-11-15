import hashlib
input_text1 = "asdf"
hash1 = hashlib.sha3_256(input_text1.encode()).hexdigest()
print(hash1)