# from cryptography.hazmat.primitives.asymmetric import rsa
# from cryptography.hazmat.primitives import serialization

# # RSA 키 쌍 생성
# private_key = rsa.generate_private_key(
#     public_exponent=65537,
#     key_size=2048
# )
# public_key = private_key.public_key()

# # 개인키를 PEM 형식으로 저장
# with open("private_key.pem", "wb") as private_file:
#     private_file.write(
#         private_key.private_bytes(
#             encoding=serialization.Encoding.PEM,
#             format=serialization.PrivateFormat.TraditionalOpenSSL,
#             encryption_algorithm=serialization.NoEncryption()  # 암호화가 필요할 경우 NoEncryption 대신 비밀번호 설정 가능
#         )
#     )

# # 공개키를 PEM 형식으로 저장
# with open("public_key.pem", "wb") as public_file:
#     public_file.write(
#         public_key.public_bytes(
#             encoding=serialization.Encoding.PEM,
#             format=serialization.PublicFormat.SubjectPublicKeyInfo
#         )
#     )
