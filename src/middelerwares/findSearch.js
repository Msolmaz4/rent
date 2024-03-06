"use strict"



module.exports=async(req,res,next)=>{

const filter = req?.query?.filter || {}
const search = req.query?.search || {}



// Bu kullanımın temel sebebi, metin tabanlı aramalar için esnek ve özelleştirilebilir bir arama paterni tanımlamak içindir. MongoDB'de $regex kullanımı, bir alanı belirli bir desene göre sorgulamak için regular expression (regex) ifadesini belirtir.

for(let key in search) search[key] = {$regex:search[key],$options:i}
const sort = req.query?.sort || {}

let limit = Number(req.query?.limit)
limit = limit > 0 ? (process.env.LIMIT) : 25

let page = Number(req.query?.page)
page = page > 0 ?   (page-1) : 0 

let skip = Number(req.query?.skip)
skip = skip > 0 ? skip :(page*skip)

res.getModelList = async (Model, customFilter = {}, populate = null) => {
    return await Model.find({ ...filter, ...search, ...customFilter }).sort(sort).skip(skip).limit(limit).populate(populate)
}

    // Details:
    res.getModelListDetails = async (Model, customFilter = {}) => {

        const data = await Model.find({ ...filter, ...search, ...customFilter })

        let details = {
            filter,
            search,
            sort,
            skip,
            limit,
            page,
            pages: {
                previous: (page > 0 ? page : false),
                current: page + 1,
                next: page + 2,
                total: Math.ceil(data.length / limit)
            },
            totalRecords: data.length,
        }
        details.pages.next = (details.pages.next > details.pages.total ? false : details.pages.next)
        if (details.totalRecords <= limit) details.pages = false
        return details
    }
    
    next()









}