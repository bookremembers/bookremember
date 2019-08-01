package com.newer.sq.mapper;

import com.newer.sq.domain.Ordermore;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrdermoreMapper {

    //根据书籍名称进行模糊查询
    public  List<Ordermore> queryLikeBookname(@Param("bname")String bname,@Param("ordstatus") String ordstatus);

    //点击下一步添加订单待付款信息
    @Insert("insert into sq_order values(null,#{uid},#{bid},#{ordint},#{ordstatus},null,now())")
    public int addOrdermore(int uid,int bid,int ordint,String ordstatus);

    //根据id删除信息
    @Delete("delete from sq_order where ordid = #{ordid}")
    public int delOrdermore(@Param("ordid")int ordid);

}

