ในส่วนของ Database testing

command
- docker compose up mariaDB
- npm install
- npm run dev

- database ในส่วนนี้จะอยู่ที่ port 3308 username: root password: 1234

อธิบายเพิ่มเติม
- ในการลงขายสินค้า จะทำการเพิ่ม product เข้าไปที่ table Products แล้วทำการเพิ่ม stock ของ Product ที่ Table Stocks โดย stock จะเก็บ uuid เป็น primary key และมี foreignkey เป็น productId โดย Table Products มี relationship กับ Stocks เป็น one to many โดยดึง stock ผ่านทาง model โดยใช้ BelongsToMany
- product สามารถรวมเป็น Bundlepack ได้โดย Table Products และ Bundles มี relationship เป็น many to many โดยผ่าน Table BundleDetails ที่เก็บ foreignkey เป็น id ของ product และ bundle
- เมื่อลงขายสินค้า product หรือ bundle จะไปอยู่ตรง Table OnSelling ใน Table นี่จะมี relation กับ product หรือ bundle โดยใน OnSelling จะเก็บ id ของ product หรือ bundle เป็น itemId โดยจะ ref ไปที่ colum type เพื่อจะได้รู้ว่าต้อง itemId เป็นของ product หรือ bundle
- OnSelling ยังมี relation กับ Table Promotions เป็น many to many ผ่าน Promotion_OnSelling โดยใน table นี้เป็นทีการกำหนด weight เมื่อสินค้าที่ลงขายอาจมีหลาย promotion ที่กำลัง active อยู่
- สามารถดูว่าขายไปแล้วเท่าไรโดยผ่าน model OnSelling -> BelongsToMany ไปหา Order