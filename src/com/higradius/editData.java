package com.higradius;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class editData
 */
@WebServlet("/editData")
public class editData extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public editData() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
//		response.getWriter().append("Served at: ").append(request.getContextPath());
		
		doPost(request, response);
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
		
		Connection conn = null;

		try {
		int invoice_id = Integer.parseInt(request.getParameter("invoice_id"));
		System.out.println(invoice_id);
		float total_open_amount = Float.parseFloat(request.getParameter("total_open_amount"));
		String notes = request.getParameter("notes");
		
		System.out.println(invoice_id + " " + total_open_amount + " " + notes);
		String USER = "root";
		String PASSWORD = "123456";
		
		int rs;
		
		Class.forName("com.mysql.cj.jdbc.Driver");
		
		conn = DriverManager.getConnection(DB_URL, USER, PASSWORD);
		conn.setAutoCommit(false);
		String sql = "update mytable set total_open_amount = ? , notes = ? where invoice_id = ?";
		
		PreparedStatement pstmt = conn.prepareStatement(sql);
		pstmt.setFloat(1, total_open_amount);
		pstmt.setString(2, notes);
		pstmt.setInt(3, invoice_id);
		rs = pstmt.executeUpdate();
		
		System.out.println(rs);
		conn.commit();
		if(rs != 0) {
			pw.println("Record updated");
		} else {
			pw.println("Failed");
		}
		
		conn.close();
		
		} catch (Exception e) {
			pw.println(e);
		}
		
}}
