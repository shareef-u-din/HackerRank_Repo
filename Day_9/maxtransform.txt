import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.util.Arrays;
import java.util.InputMismatchException;

public class G {
	InputStream is;
	PrintWriter out;
	String INPUT = "";
	int mod = 1000000007;
	
	void solve()
	{
		int n = ni();
		int[] a = na(n);
		if(n == 1){
			out.println(a[0]);
			return;
		}
		long all = (long)n*(n+1)/2%mod;
		all = all*(all+1)/2%mod;
		for(int i = 1;i <= n-1;i++){
			all -= (long)(n-i+1+n-i)*(n-i+1+n-i+1)/2;
			if(i < n-1)all += (long)(n-i)*(n-i+1)/2;
			all %= mod;
		}
		int amax = 0;
		for(int v : a)amax = Math.max(amax, v);
		long ans = all*amax;
		ans %= mod;
//		tr(ans);
		
		// inner
		int[] b = new int[n];
		for(int i = 0;i < n;i++)b[i] = -a[i];
		SegmentTreeRMQPos st = new SegmentTreeRMQPos(b);
		imos = new long[n+3];
		dfs(0, n, a, st);
		
		for(int i = 0;i <= n+2;i++){
			imos[i] %= mod;
		}
		for(int i = 0;i <= n+1;i++){
			imos[i+1] += imos[i];
			imos[i+1] %= mod;
		}
//		tr(imos);
		for(int i = 0;i <= n+1;i++){
			imos[i+1] += imos[i];
			imos[i+1] %= mod;
		}
//		tr(imos);
		for(int i = 1;i <= n;i++){
			ans += (long)i*imos[i];
			ans %= mod;
		}
//		tr(ans);
		
		// inter
		int[] sufs = new int[n];
		for(int i = 0;i < n;i++){
			sufs[i] = a[n-1-i];
			if(i > 0)sufs[i] = Math.max(sufs[i], sufs[i-1]);
		}
		int[] pres = new int[n];
		for(int i = 0;i < n;i++){
			pres[i] = a[i];
			if(i > 0)pres[i] = Math.max(pres[i], pres[i-1]);
		}
//		tr(pres);
//		tr(sufs);
		long[] cpres = new long[n+1];
		for(int i = 0;i < n;i++){
			cpres[i+1] = cpres[i] + pres[i];
		}
		long[] csufs = new long[n+1];
		for(int i = 0;i < n;i++){
			csufs[i+1] = csufs[i] + sufs[i];
		}
		
		long temp = 0;
		for(int i = n-1;i >= 1;i--){
			if(i < n-1)temp += maxsum(sufs[i-1], pres, i+1, n, cpres);
			temp += maxsum(pres[i], sufs, i-1, n, csufs);
			ans += temp;
			ans %= mod;
		}
		ans %= mod;
		if(ans < 0)ans += mod;
		out.println(ans);
//		tr(ans);
	}
	
	long maxsum(int v, int[] a, int l, int r, long[] cum)
	{
//		tr(v, a, l, r, cum);
		int ind = Arrays.binarySearch(a, l, r, v);
		if(ind < 0)ind = -ind-1;
		long ret = cum[r] - cum[ind] + (long)(ind-l) * v;
		ret %= mod;
		return ret;
	}
	
	long[] imos;
	
	void dfs(int l, int r, int[] a, SegmentTreeRMQPos st)
	{
		if(l >= r)return;
		st.minx(l, r);
		int arg = st.minpos;
		imos[1] += a[arg];
		imos[arg-l+2] -= a[arg];
		imos[r-arg+1] -= a[arg];
		imos[r-l+2] += a[arg];
//		tr(imos);
		dfs(l, arg, a, st);
		dfs(arg+1, r, a, st);
	}
	
	public static class SegmentTreeRMQPos {
		public int M, H, N;
		public int[] st;
		public int[] pos;
		
		public SegmentTreeRMQPos(int n)
		{
			N = n;
			M = Integer.highestOneBit(Math.max(N-1, 1))<<2;
			H = M>>>1;
			st = new int[M];
			pos = new int[M];
			for(int i = 0;i < N;i++)pos[H+i] = i;
			Arrays.fill(st, 0, M, Integer.MAX_VALUE);
			for(int i = H-1;i >= 1;i--)propagate(i);
		}
		
		public SegmentTreeRMQPos(int[] a)
		{
			N = a.length;
			M = Integer.highestOneBit(Math.max(N-1, 1))<<2;
			H = M>>>1;
			st = new int[M];
			pos = new int[M];
			for(int i = 0;i < N;i++){
				st[H+i] = a[i];
				pos[H+i] = i;
			}
			Arrays.fill(st, H+N, M, Integer.MAX_VALUE);
			for(int i = H-1;i >= 1;i--)propagate(i);
		}
		
		public void update(int pos, int x)
		{
			st[H+pos] = x;
			for(int i = (H+pos)>>>1;i >= 1;i >>>= 1)propagate(i);
		}
		
		private void propagate(int i)
		{
			if(st[2*i] <= st[2*i+1]){
				st[i] = st[2*i];
				pos[i] = pos[2*i];
			}else{
				st[i] = st[2*i+1];
				pos[i] = pos[2*i+1];
			}
		}
		
		public int minpos;
		public int minval;
		
		public int minx(int l, int r){
			minval = Integer.MAX_VALUE;
			minpos = -1;
			if(l >= r)return minval;
			while(l != 0){
				int f = l&-l;
				if(l+f > r)break;
				int v = st[(H+l)/f];
				if(v < minval){
					minval = v;
					minpos = pos[(H+l)/f];
				}
				l += f;
			}
			
			while(l < r){
				int f = r&-r;
				int v = st[(H+r)/f-1];
				if(v < minval){
					minval = v;
					minpos = pos[(H+r)/f-1];
				}
				r -= f;
			}
			return minval;
		}
		
		public int min(int l, int r){ 
			minpos = -1;
			minval = Integer.MAX_VALUE;
			min(l, r, 0, H, 1);
			return minval;
		}
		
		private void min(int l, int r, int cl, int cr, int cur)
		{
			if(l <= cl && cr <= r){
				if(st[cur] < minval){
					minval = st[cur];
					minpos = pos[cur];
				}
			}else{
				int mid = cl+cr>>>1;
				if(cl < r && l < mid)min(l, r, cl, mid, 2*cur);
				if(mid < r && l < cr)min(l, r, mid, cr, 2*cur+1);
			}
		}
	}

	
	void run() throws Exception
	{
		is = INPUT.isEmpty() ? System.in : new ByteArrayInputStream(INPUT.getBytes());
		out = new PrintWriter(System.out);
		
		long s = System.currentTimeMillis();
		solve();
		out.flush();
		if(!INPUT.isEmpty())tr(System.currentTimeMillis()-s+"ms");
	}
	
	public static void main(String[] args) throws Exception { new G().run(); }
	
	private byte[] inbuf = new byte[1024];
	public int lenbuf = 0, ptrbuf = 0;
	
	private int readByte()
	{
		if(lenbuf == -1)throw new InputMismatchException();
		if(ptrbuf >= lenbuf){
			ptrbuf = 0;
			try { lenbuf = is.read(inbuf); } catch (IOException e) { throw new InputMismatchException(); }
			if(lenbuf <= 0)return -1;
		}
		return inbuf[ptrbuf++];
	}
	
	private boolean isSpaceChar(int c) { return !(c >= 33 && c <= 126); }
	private int skip() { int b; while((b = readByte()) != -1 && isSpaceChar(b)); return b; }
	
	private double nd() { return Double.parseDouble(ns()); }
	private char nc() { return (char)skip(); }
	
	private String ns()
	{
		int b = skip();
		StringBuilder sb = new StringBuilder();
		while(!(isSpaceChar(b))){ // when nextLine, (isSpaceChar(b) && b != ' ')
			sb.appendCodePoint(b);
			b = readByte();
		}
		return sb.toString();
	}
	
	private char[] ns(int n)
	{
		char[] buf = new char[n];
		int b = skip(), p = 0;
		while(p < n && !(isSpaceChar(b))){
			buf[p++] = (char)b;
			b = readByte();
		}
		return n == p ? buf : Arrays.copyOf(buf, p);
	}
	
	private char[][] nm(int n, int m)
	{
		char[][] map = new char[n][];
		for(int i = 0;i < n;i++)map[i] = ns(m);
		return map;
	}
	
	private int[] na(int n)
	{
		int[] a = new int[n];
		for(int i = 0;i < n;i++)a[i] = ni();
		return a;
	}
	
	private int ni()
	{
		int num = 0, b;
		boolean minus = false;
		while((b = readByte()) != -1 && !((b >= '0' && b <= '9') || b == '-'));
		if(b == '-'){
			minus = true;
			b = readByte();
		}
		
		while(true){
			if(b >= '0' && b <= '9'){
				num = num * 10 + (b - '0');
			}else{
				return minus ? -num : num;
			}
			b = readByte();
		}
	}
	
	private long nl()
	{
		long num = 0;
		int b;
		boolean minus = false;
		while((b = readByte()) != -1 && !((b >= '0' && b <= '9') || b == '-'));
		if(b == '-'){
			minus = true;
			b = readByte();
		}
		
		while(true){
			if(b >= '0' && b <= '9'){
				num = num * 10 + (b - '0');
			}else{
				return minus ? -num : num;
			}
			b = readByte();
		}
	}
	
	private static void tr(Object... o) { System.out.println(Arrays.deepToString(o)); }
}