import java.io.*;
import java.util.*;
import java.text.*;
import java.math.*;
import java.util.regex.*;

public class Solution {

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in); 
        int t=sc.nextInt(); 
        while(t-->0) {

            int n=sc.nextInt();
            int b=0;
            while(n-->0)
            {
            int sum=findPrimeFactors(sc.nextInt(),0);
            b^=sum;
            }
            if(b==0)
            {
            System.out.println("2");    
            }else
            System.out.println("1");   
        }

}

static int findPrimeFactors(int no,int sum)
{
     while(no%2==0)
     {
       sum+=1;
        no=no/2;
     }

    for(int i=3;i<=Math.sqrt(no);i=i+2)
    {
        while(no%i==0)
            {
            sum=sum+1;
            no=no/i;
        }
    }
    if(no>2)
     sum++;

 return sum;   
}

}