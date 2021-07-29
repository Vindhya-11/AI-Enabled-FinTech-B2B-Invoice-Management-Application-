package com.higradius;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class addData
 */
@WebServlet("/addData")
public class addData extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public addData() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
//		doGet(request, response);
		
		response.setContentType("text/html");
		
		PrintWriter pw = response.getWriter();
		
		String DB_URL = "jdbc:mysql://localhost/mysql";
		
		Connection conn;
		
		try {
		String name_customer = request.getParameter("name_customer");
		int cust_number = Integer.parseInt(request.getParameter("cust_number"));
		int invoice_id = Integer.parseInt(request.getParameter("invoice_id"));
		float total_open_amount = Float.parseFloat(request.getParameter("total_open_amount"));
		String due_in_date = request.getParameter("due_in_date");  
		String notes = request.getParameter("notes");
		
		String USER = "root";
		String PASSWORD = "123456";
		
		int rs;
		
		Class.forName("com.mysql.cj.jdbc.Driver");
		
		conn = DriverManager.getConnection(DB_URL, USER, PASSWORD);
		String sql = "insert into mytable(name_customer, cust_number, invoice_id, total_open_amount, due_in_date, notes) values (?,?,?,?,?,?)";
		
		PreparedStatement pstmt = conn.prepareStatement(sql);
		pstmt.setString(1, name_customer);
		pstmt.setInt(2, cust_number);
		pstmt.setInt(3, invoice_id);
		pstmt.setFloat(4, total_open_amount);
		pstmt.setString(5, due_in_date);
		pstmt.setString(6, notes);
		
		rs = pstmt.executeUpdate();
		
		System.out.println(rs);
		
		if(rs != 0) {
			pw.println("Record inserted");
		} else {
			pw.println("Failed");
		}
		
		conn.close();
		
		} catch (Exception e) {
			pw.println(e);
		}
		
		
	}

}
