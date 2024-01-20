const mysqlConnection = require('./connectDB')

module.exports = function (app) {
  const handleError = (res, err) => {
    console.log(err)
    res.status(300).send(JSON.stringify(err))
  }
  //Get all products
  app.get('/products', (req, res) => {
    mysqlConnection.query('SELECT * FROM product', (err, rows, fields) => {
      if (err) handleError(res, err)
      res.send(rows)
    })
  })


  app.get('/update',async(req,res)=>{
    let resData=[]
    for(i=1;i<=850;i+=3){
      resData.push(`UPDATE 'radio' SET language='English' where id=${i}`)
    }
    res.send(resData)
  })



  //Get all products paginated
  app.get('/product', async (req, res) => {
    const params = req.query
    const limit = Number(params.limit) || 10
    const skip = Number(params.skip) || 1

    mysqlConnection.query('SELECT COUNT(*) as TOTAL FROM product',(err, row) => {
        if (err) handleError(res, err)
        mysqlConnection.query('SELECT * FROM `product` LIMIT ? OFFSET ?',[limit, skip],(errs, rows) => {
            if (err) handleError(res, errs)
            res.json({
              data: rows,
              PerPageRows: limit,
              TotalPages: Math.ceil(row[0].TOTAL / limit),
              Total: row[0].TOTAL,
            })
          },
        )
      },
    )
  })
}
