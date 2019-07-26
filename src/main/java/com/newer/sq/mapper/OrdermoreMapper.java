package com.newer.sq.mapper;

import com.newer.sq.domain.Ordermore;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

public interface OrdermoreMapper {

    //根据状态查询信息
    @Select("select ordid,ordint,orderdate,aname,amore,Aphone,bname,bookurl,Bprice,Bpage,Bsize,Bway,ordstatus " +
            "from sq_order sq_ord,sq_address address,sq_book book where sq_ord.bid=book.bid and sq_ord.addressid=address.addressid and ordstatus = #{ordstatus}")
    public  List<Ordermore> queryByordstatus(@Param("ordstatus")String  ordstatus);

    //根据书籍名称进行模糊查询
    public  List<Ordermore> queryLikeBookname(@Param("bname")String bname);

    //点击下一步添加订单待付款信息
    @Insert("insert into sq_order values(null,#{uid},#{bid},#{ordint},#{ordstatus},null,now())")
    public int addOrdermore(int uid,int bid,int ordint,String ordstatus);

    //根据id删除信息
    @Delete("delete from sq_order where ordid = #{ordid}")
    public int delOrdermore(@Param("ordid")int ordid);
}

